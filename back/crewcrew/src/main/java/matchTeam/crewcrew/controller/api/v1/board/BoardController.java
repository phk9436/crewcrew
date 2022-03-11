package matchTeam.crewcrew.controller.api.v1.board;

import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.board.*;
import matchTeam.crewcrew.entity.board.Board;
import matchTeam.crewcrew.response.ErrorCode;
import matchTeam.crewcrew.response.ResponseHandler;
import matchTeam.crewcrew.service.board.BoardHitService;
import matchTeam.crewcrew.service.board.BoardService;
import matchTeam.crewcrew.specification.BoardSpecs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Api(value = "Board Controller", tags = "5. board")
@ApiOperation(value = "게시판 생성, 삭제, 수정, 조회")
@RequiredArgsConstructor //생성자 주입
@RestController
public class BoardController {

    private final BoardService boardService;
    private final BoardHitService boardHitService;

    @ApiOperation(value = "게시글 생성", notes = "게시글을 생성한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "게시글 번호로 수정 성공",
                    response = BoardSaveResponseDTO.class
            ),
            @ApiResponse(
                    code = 2101,
                    message = "제목이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2102,
                    message = "본문 내용이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2103,
                    message = "유효하지 않은 모임방식입니다."
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            ),
            @ApiResponse(
                    code = 2104,
                    message = "카테고리 값이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2105,
                    message = "상세 카테고리를 고르지 않았습니다."
            ),
            @ApiResponse(
                    code = 2106,
                    message = "총모집인원이 0보다 작습니다."
            ),
            @ApiResponse(
                    code = 2107,
                    message = "집모집인원이 10명보다 큽니다."
            ),
            @ApiResponse(
                    code = 2109,
                    message = "만료날짜가 오늘날짜보다 이전이거나 오늘입니다."
            ),
            @ApiResponse(
                    code = 2110,
                    message = "요청한 유저와 응답한 결과의 유저가 다릅니다."
            ),
            @ApiResponse(
                    code = 2111,
                    message = "존재하지 않는 유저입니다."
            ),
            @ApiResponse(
                    code = 2112,
                    message = "요청한 게시판 번호와 응답한 결과의 게시판 번호가 다릅니다"
            )
    })
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(value = "/board")
    public ResponseEntity<Object> save(@ApiParam(value = "게시글 생성 요청 DTO", required = true)@RequestBody BoardSaveRequestDTO req){
        //유효한 리퀘스트인지 확인
        boardService.checkValidSave(req);

        BoardSaveResponseDTO saveBoard = boardService.save(req);

        //uid가 일치하는지 확인
        boardService.checkMathchingUid(req.getUid(), saveBoard.getUid());

        return ResponseHandler.generateResponse("게시글 생성 성공", HttpStatus.OK,saveBoard);
    }

    @ApiOperation(value = "게시글 조회(번호로 조회)", notes = "게시글 번호로 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "게시글 번호로 조회 성공",
                    response = BoardResponseDTO.class
            ),
            @ApiResponse(
                    code = 2301,
                    message = "존재하지 않는 게시글 번호입니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/board/{boardId}")
    public ResponseEntity<Object> findByboardId(@ApiParam(value = "게시글 번호", required = true)@PathVariable Long boardId){
        BoardResponseDTO findBoard = boardService.findById(boardId);
        boardHitService.updateHit(boardId);
        return ResponseHandler.generateResponse("게시글 번호로 조회 성공",HttpStatus.OK, findBoard);
    }

    @ApiOperation(value = "다중 조건에 의한 게시글 리스트 조회", notes = "조건에 따라 게시글 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "게시글 리스트 다중 조건 조회 성공",
                    response = PageResponseDTO.class
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            ),
            @ApiResponse(
                    code = 2301,
                    message = "올바른 정렬 조건이 아닙니다."
            )
    })
    @ApiImplicitParams({
            @ApiImplicitParam(
                    name = "approach",
                    value = "0은 오프라인, 1은 온라인 0%2C1 = [0, 1], 값 구분은 %2C"
            ),
            @ApiImplicitParam(
                    name = "categoryIds",
                    value = "상세 카테고리 아이디들, 3%2C4%2C5 = [3, 4, 5], 값 구분은 %2C"
            ),
            @ApiImplicitParam(
                    name = "keyword",
                    value = "제목+내용으로 검색할 키워드"
            ),
            @ApiImplicitParam(
                    name = "order",
                    value = "정렬 기준 키워드, recent=최신, popular=조회수, expired-date=만료날짜, expired-crew=남은 인원",
                    defaultValue = "recent"
            ),
            @ApiImplicitParam(
                    name = "page",
                    value = "페이지 번호, 0부터 시작"
            )
    })
    @GetMapping("/board/list")
    public ResponseEntity<Object> getBoardList(@ModelAttribute BoardSpecs boardSpecs,
                                               @PageableDefault(size = 10) Pageable pageable){

        Page<BoardResponseDTO> result = boardService.search(boardSpecs, pageable);
        PageResponseDTO pageResponseDTO = PageResponseDTO.toDTO(result);
        return ResponseHandler.generateResponse("게시글 리스트 다중 조건 조회 성공", HttpStatus.OK, pageResponseDTO);
    }



    @ApiOperation(value = "게시글 수정(게시글 번호로 수정)", notes = "게시글 번호로 수정한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "게시글 번호로 수정 성공",
                    response = BoardResponseDTO.class
            ),
            @ApiResponse(
                    code = 2101,
                    message = "제목이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2102,
                    message = "본문 내용이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2103,
                    message = "유효하지 않은 모임방식입니다."
            ),
            @ApiResponse(
                    code = 2001,
                    message = "존재하지 않는 카테고리 번호입니다."
            ),
            @ApiResponse(
                    code = 2104,
                    message = "카테고리 값이 비어있습니다."
            ),
            @ApiResponse(
                    code = 2105,
                    message = "상세 카테고리를 고르지 않았습니다."
            ),
            @ApiResponse(
                    code = 2106,
                    message = "총모집인원이 0보다 작습니다."
            ),
            @ApiResponse(
                    code = 2107,
                    message = "총모집인원이 10명보다 큽니다."
            ),
            @ApiResponse(
                    code = 2108,
                    message = "모집인원이 총인원보다 많습니다."
            ),
            @ApiResponse(
                    code = 2109,
                    message = "만료날짜가 오늘날짜보다 이전이거나 오늘입니다."
            ),
            @ApiResponse(
                    code = 2110,
                    message = "요청한 유저와 응답한 결과의 유저가 다릅니다."
            ),
            @ApiResponse(
                    code = 2111,
                    message = "존재하지 않는 유저입니다."
            ),
            @ApiResponse(
                    code = 2112,
                    message = "요청한 게시판 번호와 응답한 결과의 게시판 번호가 다릅니다"
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping("/board/{boardId}")
    public ResponseEntity<Object> update(@ApiParam(value = "수정을 요청하는 게시글 번호", required = true)@PathVariable Long boardId,
                                         @ApiParam(value = "게시글 수정 요청 DTO", required = true)@RequestBody BoardUpdateRequestDTO req){
        boardService.checkValidUpdate(req);

        Long updateBoardId = boardService.update(boardId, req);
        BoardResponseDTO updateBoard = boardService.findById(updateBoardId);

        boardService.checkMathchingUid(req.getUid(), updateBoard.getUid());
        boardService.checkMathchingBoardId(boardId, updateBoard.getBoardId());
        return ResponseHandler.generateResponse("게시글 번호로 수정 성공",HttpStatus.OK, updateBoard);
    }

    @ApiOperation(value = "게시글 삭제(게시글 번호로 삭제)", notes = "게시글 번호로 삭제한다.")
    @ApiResponses({
            @ApiResponse(
                    code = 200,
                    message = "%d번 게시글이 삭제 성공",
                    response = Long.class
            ),
            @ApiResponse(
                    code = 2301,
                    message = "존재하지 않는 게시글 번호입니다."
            )
    })
    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping("/board/{boardId}")
    public ResponseEntity<Object> delete(@ApiParam(value = "삭제를 요청하는 게시글 번호", required = true)
                                             @PathVariable Long boardId){
        boardService.delete(boardId);
        return ResponseHandler.generateResponse(boardId+"번 게시글이 삭제 성공", HttpStatus.OK, boardId);
    }


}