
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiOperation;


/**
 * REST controller for managing HelpdeskTickets.
 */
@RestController
@RequestMapping("/api")
@Api(value="Helpdesk ticket conversation", description="Operations pertaining to reterive helpdesk ticket conversation.")
public class TicketConversationResource {

	private final Logger log = LoggerFactory.getLogger(HelpdeskTicketsResource.class);

	private final UserRepository userRepository;
	private final HelpdeskTicketsRepository helpdeskTicketsRepository;
	private final TicketConversationService ticketConversationService;

	@Autowired
	private ChatS3BucketService amazonClient;

	@Autowired
	private CustomerRepository customerRepository;

	public TicketConversationResource(final HelpdeskTicketsRepository helpdeskTicketsRepository,
			final TicketConversationService ticketConversationService, final UserRepository userRepository,
			final UserService userService) {

		this.userRepository = userRepository;
		this.ticketConversationService = ticketConversationService;
		this.helpdeskTicketsRepository = helpdeskTicketsRepository;
	}

	/**
	 * POST /ticket/conversation : Create a new message for helpdesk ticket.
	 *
	 * @param ticketConversationVM the ticketConversationVM to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new
	 *         message, or with status 400 (Bad Request) if the message 
	 *         is not created
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */

	@ApiOperation(value = "Generate helpdesk ticket conversation messages", response = ResponseEntity.class)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successfully generation of helpdesk ticket conversation messages."),
        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
        @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    }
    )
	@PostMapping("/ticket/conversation")
	@Timed
	public ResponseEntity<ResponseVM> createTicketConversation(
			@Valid @RequestBody final TicketConversationVM ticketConversationVM, final HttpServletRequest request)
			throws URISyntaxException {

		log.debug("REST request to save TicketConversatation : {}", ticketConversationVM);
		final ResponseVM responseVM = new ResponseVM();
		final Integer statusCode = 200;
		final Optional<HelpdeskTickets> ticketOpt = helpdeskTicketsRepository
				.findOneByTicketNumber(ticketConversationVM.getTicketnumber());
		HelpdeskTickets ticket;
		if (ticketOpt.isPresent()) {
			ticket = ticketOpt.get();
			final TicketConversation conversation = new TicketConversation();
			conversation.setIsUserReply(true);
			conversation.setTicket(ticket);
			conversation.setIsFile(false);
			conversation.setMessage(ticketConversationVM.getMessage());
			conversation.setCreatedAt(Instant.now());
			conversation.setUpdatedAt(Instant.now());
			conversation.setTimestamp((new Date()).getTime());
			ticketConversationService.save(conversation);

			responseVM.setCode(statusCode.toString());
			responseVM.setMsg("Ticket conversation user msg.");

			final Map<String, Object> data = new LinkedHashMap<>();
			data.put("msgsend", true);
			responseVM.setData(data);

			return ResponseEntity.created(new URI("/api/ticket/conversation/" + ticketConversationVM.getTicketnumber()))
					.headers(HeaderUtil.createAlert("Ticket conversation user reply", responseVM.getMsg()))
					.body(responseVM);
		} else {
			throw new BadRequestAlert("Unable to send message.", "MsgNotSend", "unable to send message");
		}
	}

	/**
	 * GET /ticket/conversation : get all ticket conversation of any
	 * helpdeskTickets.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of ticket
	 *         conversation in body
	 */
	@ApiOperation(value = "Get messages of required helpdesk ticket", response = ResponseEntity.class)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successfully retreval of helpdesk ticket conversation messages."),
        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
        @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    }
    )
	@GetMapping("/ticket/conversation/{ticketNumber}")
	@Timed
	public ResponseEntity<List<TicketConversation>> getTicketConversation(@PathVariable final String ticketNumber,
			final HttpServletRequest request) {
	
		final Optional<HelpdeskTickets> ticketOpt = helpdeskTicketsRepository.findOneByTicketNumber(ticketNumber);
		HelpdeskTickets ticket;
		if (ticketOpt.isPresent()) {
			ticket = ticketOpt.get();
			log.debug("REST request to get ticket conversation of a Helpdesk Tickets");
			final List<TicketConversation> list = ticketConversationService.findAllByTicket(ticket);
			final HttpHeaders headers = HeaderUtil.createAlert("Ticket Conversation", "/api/ticket/conversation");
			return new ResponseEntity<>(list, headers, HttpStatus.OK);
		} else {
			throw new BadRequestAlert("Helpdesk ticket not found.", "TicketNotFound", "Ticket not Found");
		}

	}
/**
	 * POST /ticket/conversation/upload : upload file for ticket conversation of any
	 * helpdeskTickets.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of ticket
	 *         conversation in body
	 */
	@ApiOperation(value = "Helpdesk ticket document upload", response = ResponseEntity.class)
    @ApiResponses(value = {
        @ApiResponse(code = 200, message = "Successfully helpdesk ticket file upload."),
        @ApiResponse(code = 401, message = "You are not authorized to view the resource"),
        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
        @ApiResponse(code = 404, message = "The resource you were trying to reach is not found")
    }
    )

	@PostMapping("/ticket/conversation/upload")
	public ResponseEntity<MessageDTO> uploadFile1(
			@RequestPart(value = "files", required = true) final List<MultipartFile> files,
			@RequestParam(value = "ticketNumber", required = true) final String ticketNumber,
			final HttpServletRequest request) {

		try {

			final Iterator<MultipartFile> fileList = files.iterator();
			final User user = userRepository.findOneByLogin(request.getRemoteUser()).get();
			final Optional<HelpdeskTickets> ticketOpt = helpdeskTicketsRepository.findOneByTicketNumber(ticketNumber);
			final Customer customer = customerRepository.findOneByEmailIgnoreCase(user.getEmail());
			final Boolean role = SecurityUtils.isCurrentUserInRole("ROLE_USER");
			final MessageDTO message = new MessageDTO();
			if (ticketOpt.isPresent()) {
				ticketOpt.get();

				while (fileList.hasNext()) {

					final MultipartFile file = fileList.next();
					final String fileLink = amazonClient.uploadTicketFile(file, customer.getEmail(), ticketNumber);

					final TicketConversation conversation = new TicketConversation();
					if (role) {
						conversation.setIsUserReply(true);
					} else {
						conversation.setIsUserReply(false);
					}
					
					conversation.setTicket(ticketOpt.get());
					conversation.setIsFile(true);
					conversation.setMessage(fileLink);
					conversation.setCreatedAt(Instant.now());
					conversation.setUpdatedAt(Instant.now());
					conversation.setTimestamp((new Date()).getTime());
					ticketConversationService.save(conversation);
				
				
					message.setIsFile(true);
					message.setTicketId(ticketNumber);
					message.setTime(Instant.now().toString());
					message.setUserLogin(user.getEmail());
					message.setMessage(fileLink);

					if (SecurityUtils.isCurrentUserInRole("ROLE_ADMIN")) {
						message.setIsUserReply(false);
					} else {
						message.setIsUserReply(true);
					}
				//	ticketConversationService.save(message);
				}

				return ResponseEntity.created(new URI("/api/ticket/conversation/" + customer.getId().toString()))
						.headers(HeaderUtil.createAlert("Ticket fileupload", message.getMessage())).body(message);
			} else {

				throw new BadRequestAlert("Helpdesk ticket not found.", "TicketNotFound", "Ticket not Found");

			}

		} catch (final Exception ex) {

			log.error("Exception in upload File Api" + ex);
			throw new BadRequestAlert("unable to upload file.", "TicketFileUploadFail", "file upload failed");

		}

	}
}