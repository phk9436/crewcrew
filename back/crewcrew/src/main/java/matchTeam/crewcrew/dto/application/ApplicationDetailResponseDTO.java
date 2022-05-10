package matchTeam.crewcrew.dto.application;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import matchTeam.crewcrew.entity.application.Application;
import matchTeam.crewcrew.entity.board.Board;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class ApplicationDetailResponseDTO {
    @ApiModelProperty(value = "신청서의 id")
    private Long apId;

    @ApiModelProperty(value = "게시판의 board id", notes = "게시판 번호")
    private Long boardId;

    @ApiModelProperty(value = "유저의 uid", notes = "게시글을 작성한 유저 uid")
    private Long uid;

    @ApiModelProperty(value = "유저의 프로필 이미지 링크", notes = "게시글을 작성한 유저의 프로필 이미지 링크")
    private String profileImage;

    @ApiModelProperty(value = "게시글 제목", notes = "게시글 제목")
    private String title;

    @ApiModelProperty(value = "카테고리 부모 id", notes = "카테고리 부모 id")
    private Long categoryParentId;

    @ApiModelProperty(value = "카테고리 상세 id", notes = "카테고리 상세 id")
    private Long categoryId;

    @ApiModelProperty(value = "모임 접근 방식", notes = "0은 오프라인, 1은 온라인", example = "0")
    private Integer approachCode;

    @ApiModelProperty(value = "지원한 사람의 수", notes = "지원하는 사람의 수", example = "0")
    private Integer appliedCrew;

    @ApiModelProperty(value = "모집하는 인원수", notes = "모집하는 인원수", example = "5")
    private Integer recruitedCrew;

    @ApiModelProperty(value = "총인원수", notes = "총인원수", example = "5")
    private Integer totalCrew;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @ApiModelProperty(value = "참여요청한 날짜", notes = "참여요청한 날짜(년월일)")
    private LocalDateTime appliedDate;

    @ApiModelProperty(value = "만료날짜", notes = "년원일", example = "2023-02-27")
    private LocalDate expiredDate;

    @ApiModelProperty(value = "만료여부", notes = "만료여부를 true(만료x) or false(만료됨)로 표현", example = "1")
    private Boolean viewable;

    @ApiModelProperty(value = "모집진행상태(0: 참여거절, 1: 참여요청중, 2: 참여완료, 3: 참여취소)", notes = "")
    private Integer progress;

    @QueryProjection
    @Builder
    public ApplicationDetailResponseDTO(Board res, Application application) {
        this.apId = application.getId();
        this.boardId = res.getId();
        this.uid = res.getUser().getUid();
        this.profileImage = res.getUser().getProfileImage();
        this.title = res.getTitle();
        this.approachCode = res.getApproach();
        this.categoryParentId = res.getCategory().getCategoryParent().getId();
        this.categoryId = res.getCategory().getId();
        this.appliedCrew = res.getAppliedCrew();
        this.recruitedCrew = res.getRecruitedCrew();
        this.totalCrew = res.getTotalCrew();
        this.appliedDate = application.getCreatedDate();
        this.expiredDate = res.getExpiredDate();
        this.viewable = res.getViewable();
        this.progress = application.getProgress();
    }
}
