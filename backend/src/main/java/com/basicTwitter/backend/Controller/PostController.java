package com.basicTwitter.backend.Controller;

import com.basicTwitter.backend.DTO.CommentRequestDTO;
import com.basicTwitter.backend.DTO.PostRequestDTO;
import com.basicTwitter.backend.Model.Comment;
import com.basicTwitter.backend.Model.Post;
import com.basicTwitter.backend.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1")
@RestController
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    // Эндпоинт для создания поста
    @PostMapping("/createPost")
    public ResponseEntity<Post> createPost(@RequestBody PostRequestDTO postRequest) {
        // Обрабатываем данные из тела запроса
        Post post = postService.createPost(postRequest.getContent());

        return ResponseEntity.status(HttpStatus.CREATED).body(post); // Возвращаем новый пост
    }

    // Эндпоинт для получения постов текущего пользователя
    @GetMapping("/myPosts")
    public ResponseEntity<List<Post>> getMyPosts() {
        List<Post> posts = postService.getMyPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // Эндпоинт для удаления поста
    @DeleteMapping("/deletePost/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        try {
            postService.deletePost(postId);
            return new ResponseEntity<>("Post deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Post not found", HttpStatus.NOT_FOUND);
        }
    }

    // Лайк поста
    @PostMapping("/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long postId) {
        Post post = postService.likePost(postId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    // Дизлайк поста
    @PostMapping("/{postId}/dislike")
    public ResponseEntity<Post> dislikePost(@PathVariable Long postId) {
        Post post = postService.dislikePost(postId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    // Добавление комментария к посту
    @PostMapping("/{postId}/comment")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody CommentRequestDTO commentRequestDTO) {
        Comment comment = postService.addComment(postId, commentRequestDTO.getContent());
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }
}
