import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  const postsHtml = posts.map((post) => {
    return `
    <li class="post">
                    <div class="post-header" data-user-id="${post.userId}">
                        <img src="${post.userImage}" class="post-header__user-image">
                        <p class="post-header__user-name">${post.userName}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${post.image}>
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${post.id}" class="like-button">
                        <img src="${post.isLiked ? './assets/images/like-active.svg' : './asserts/images/like-not-active.svg'}">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${post.likes}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${post.userName}</span>
                      ${post.text}
                    </p>
                    <p class="post-date">
                      ${post.date}
                    </p>
                  </li>
    `
  })
  .join('')
  // @TODO: реализовать рендер постов из api
  // console.log("Актуальный список постов:", posts);

  /**
   * @TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
