async function newPostFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector("input[name='post-title']").value;
    const body = document.querySelector("textarea[name='post-body']").value;

    const response = await fetch(`/api/posts`, {
        method: "POST", 
        body: JSON.stringify({ title, body }),
        headers: { "Content-Type": "application/json" }
    });

    console.log(response);

//     if (response.ok) {
//         document.location.replace("/dashboard");
//     } else {
//         alert(response.statusText);
//     };
};

// event listener
document.querySelector(".new-post-form").addEventListener("submit", newPostFormHandler);