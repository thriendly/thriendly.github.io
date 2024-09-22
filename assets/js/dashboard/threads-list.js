function confirmDelete(id) {
    if (confirm("Are you sure you want to delete this thread?")) {
      // Find and remove the thread from the array
      const index = threads.findIndex((thread) => thread.id === id);
      if (index !== -1) {
        threads.splice(index, 1);
        renderThreads();
      }
    } else {
      console.log("Delete action cancelled");
    }
  }
  
  // Example data: list of threads
  const threads = [
    { id: 1, content: "Thread 1 <br> thread 2 content<br> thread 2 content<br> thread 2 content<br> thread 2 content", scheduled: "2024-07-21 10:00 AM" },
    { id: 2, content: "Thread 2", scheduled: "2024-07-22 10:00 AM" },
    { id: 3, content: "Thread 3", scheduled: "2024-07-23 10:00 AM" },
    { id: 4, content: "Thread 4", scheduled: "2024-07-24 10:00 AM" },
    { id: 5, content: "Thread 5", scheduled: "2024-07-25 10:00 AM" },
    { id: 6, content: "Thread 6", scheduled: "2024-07-26 10:00 AM" },
    { id: 7, content: "Thread 7", scheduled: "2024-07-27 10:00 AM" },
    { id: 8, content: "Thread 8", scheduled: "2024-07-28 10:00 AM" },
    { id: 9, content: "Thread 9", scheduled: "2024-07-29 10:00 AM" },
    { id: 10, content: "Thread 10", scheduled: "2024-07-30 10:00 AM" },
  ];
  
  const itemsPerPage = 5;
  let currentPage = 1;
  
  function renderThreads() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const threadsToDisplay = threads.slice(startIndex, endIndex);
  
    const threadList = $("#thread-list");
    threadList.empty();
  
    $.each(threadsToDisplay, function(index, thread) {
      const threadCard = `
        <div class="card mb-4">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center justify-content-between w-100">
              <p class="mb-0">${thread.content}</p>
              <span class="time-display ms-3" title="${new Date(thread.scheduled).toLocaleString()}">
                <i class="fas fa-clock clock-icon"></i>
                ${new Date(thread.scheduled).toLocaleDateString()} ${new Date(thread.scheduled).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${thread.id}">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      `;
      threadList.append(threadCard);
    });
  
    $(".delete-btn").on("click", function() {
      const id = $(this).data("id");
      confirmDelete(id);
    });
  
    renderPagination();
  }
  
  function renderPagination() {
    const totalPages = Math.ceil(threads.length / itemsPerPage);
    const pagination = $("#pagination");
    pagination.empty();
  
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = `
        <li class="page-item${i === currentPage ? " active" : ""}">
          <a class="page-link" href="#">${i}</a>
        </li>
      `;
      pagination.append(pageItem);
    }
  
    $(".page-link").on("click", function(e) {
      e.preventDefault();
      currentPage = $(this).text();
      renderThreads();
    });
  }
  
  // Initial render
  renderThreads();
  