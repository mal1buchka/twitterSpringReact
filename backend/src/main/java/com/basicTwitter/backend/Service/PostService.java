package com.basicTwitter.backend.Service;

import com.basicTwitter.backend.DAO.CommentRepository;
import com.basicTwitter.backend.DAO.PostRepository;
import com.basicTwitter.backend.DAO.UserRepository;
import com.basicTwitter.backend.Model.Comment;
import com.basicTwitter.backend.Model.Post;
import com.basicTwitter.backend.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Autowired
    public PostService(PostRepository postRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    // Создание нового поста
    public Post createPost(String content) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = new Post();
        post.setContent(content);
        post.setCreatedAt(LocalDateTime.now()); // Время создания поста
        post.setUser(user); // Связываем пост с текущим пользователем

        return postRepository.save(post);
    }

    // Получение всех постов текущего пользователя
    public List<Post> getMyPosts() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return postRepository.findByUser(user); // Возвращаем все посты пользователя
    }

    // Удаление поста по ID
    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }

    // Лайк поста
    public Post likePost(Long postId) {
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            post.setLikes(post.getLikes() + 1); // Увеличиваем количество лайков
            return postRepository.save(post);
        }
        return null;
    }

    // Дизлайк поста
    public Post dislikePost(Long postId) {
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            post.setDislikes(post.getDislikes() + 1); // Увеличиваем количество дизлайков
            return postRepository.save(post);
        }
        return null;
    }
    @Transactional
    // Добавление комментария к посту
    public Comment addComment(Long postId, String content) {
        // Получаем текущего пользователя из контекста безопасности
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Находим пост по id
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Создаем новый комментарий
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setPost(post);
        comment.setUser(user);

        // Сохраняем комментарий в базе данных
        return commentRepository.save(comment);
    }
}
