const comments = [
    { id: 1, message: "Comment 1", parent: 0 },
    { id: 2, message: "Comment 2", parent: 0 },
    { id: 3, message: "Comment 3", parent: 0 },
    { id: 4, message: "Reply 1", parent: 1 }
];
const commentsSection = document.querySelector("#comments");
document.querySelector("#main-button").addEventListener("click", (event) => {
    comments.push({
        id: comments.length + 1,
        message: document.querySelector(`#main-input`).value,
        parent: 0
    });
    drawLine({
        id: comments.length + 1,
        message: document.querySelector(`#main-input`).value,
        parent: 0
    });
    document.querySelector(`#main-input`).value = "";
});
function drawLine(e) {
    const commentLine = document.createElement("li");
    commentLine.className = `comment-${e.id}`;
    const commentText = document.createElement("p");
    commentText.innerText = e.message;
    commentLine.appendChild(commentText);
    const commentReaction = document.createElement("div");
    commentReaction.className = `reaction-${e.id}`;
    const commentButton = document.createElement("button");
    commentButton.innerText = "REPLY";
    commentButton.addEventListener("click", (event) => {
        const reaction = document.querySelector(`.reaction-${e.id}`);
        reaction.removeChild(event.target);
        const input = document.createElement("input");
        input.type = "text";
        input.className = `input-${e.id}`;
        const submit = document.createElement("button");
        submit.className = `submit-${e.id}`;
        submit.innerText = "SUBMIT";
        submit.addEventListener("click", (event2) => {
            comments.push({
                id: comments.length + 1,
                message: document.querySelector(`.input-${e.id}`).value,
                parent: e.id
            });
            drawLine({
                id: comments.length + 1,
                message: document.querySelector(`.input-${e.id}`).value,
                parent: e.id
            });
            while (reaction.lastChild) {
                reaction.lastChild.remove();
            }
            reaction.appendChild(event.target);
        });
        reaction.appendChild(input);
        reaction.appendChild(submit);
        input.focus();
    });
    commentReaction.appendChild(commentButton);
    commentLine.appendChild(commentReaction);
    const commentResponses = document.createElement("ul");
    commentLine.appendChild(commentResponses);
    if (e.parent === 0) commentsSection.appendChild(commentLine);
    if (e.parent !== 0) {
        const commentParent = document
            .querySelector(`.comment-${e.parent}`)
            .querySelector("ul");
        commentParent?.appendChild(commentLine);
    }
}
function drawComments() {
    while (commentsSection.lastChild) {
        commentsSection.lastChild.remove();
    }
    comments.map((e) => {
        drawLine(e);
    });
}
drawComments();
