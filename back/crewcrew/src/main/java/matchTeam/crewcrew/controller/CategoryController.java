package matchTeam.crewcrew.controller;

import lombok.RequiredArgsConstructor;
import matchTeam.crewcrew.dto.CategoryDTO;
import matchTeam.crewcrew.response.board.BoardSuccessResponse;
import matchTeam.crewcrew.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/boardwrite")
    @ResponseStatus(value = HttpStatus.OK)
    public BoardSuccessResponse getAllCategories(){
        final List<CategoryDTO> categories = categoryService.getAllCategories();
        return BoardSuccessResponse.success(categories);
    }
}
