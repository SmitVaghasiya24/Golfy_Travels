import { useEffect } from "react";

function CursorFollower() {
  useEffect(() => {
    const ball = document.createElement("div");
    ball.className = "cursor-ball";
    document.body.appendChild(ball);

    const move = (e) => {
      if (!ball.classList.contains("hidden-by-hover")) {
        ball.style.opacity = "1";
      }
      ball.style.left = e.clientX + "px";
      ball.style.top = e.clientY + "px";
    };

    const hover = (e) => {
      const shouldHide = e.target.closest(".cursor-hide");
      if (shouldHide) {
        ball.classList.add("hidden-by-hover");
        ball.style.opacity = "0";
      } else {
        ball.classList.remove("hidden-by-hover");
        ball.style.opacity = "1";
      }
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", hover);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", hover);
      ball.remove();
    };
  }, []);

  return null;
}

export default CursorFollower;
