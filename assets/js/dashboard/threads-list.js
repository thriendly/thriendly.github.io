function confirmDelete(id) {
    if (confirm("Are you sure you want to delete this thread?")) {
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
    { id: 1, content: `
  The Gig economy is booming 💥
  
  Yet people don't know how to find the right opportunities.
  
  4 ONLINE JOBS that are in HIGH DEMAND. 
  
  (Work from anywhere, set your own hours) 🧵`, scheduled: "Sep 21, 2024 10:00 AM" },
    { id: 2, content: "Thread 2", scheduled: "Sep 20, 2024 10:00 AM" },
    { id: 3, content: "Thread 3", scheduled: "Sep 19, 2024 10:00 AM" },
    { id: 4, content: "Thread 4", scheduled: "Sep 18, 2024 10:00 AM" },
    { id: 5, content: "Thread 5", scheduled: "Sep 17, 2024 10:00 AM" },
    { id: 6, content: "Thread 6", scheduled: "Sep 16, 2024 10:00 AM" },
    { id: 7, content: "Thread 7", scheduled: "Sep 15, 2024 10:00 AM" },
    { id: 8, content: "Thread 8", scheduled: "Sep 14, 2024 10:00 AM" },
    { id: 9, content: "Thread 9", scheduled: "Sep 13, 2024 10:00 AM" },
    { id: 10, content: "Thread 10", scheduled: "Sep 12, 2024 10:00 AM" },
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
          <div class="card-body">
            <div class="thread-content mb-3">${formatContent(thread.content)}</div>
            <div class="d-flex justify-content-between align-items-center">
              <span class="time-display mt-3" title="${new Date(thread.scheduled).toLocaleString()}">
                <i class="fas fa-clock clock-icon"></i>
                ${new Date(thread.scheduled).toLocaleDateString()} ${new Date(thread.scheduled).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              <button class="btn btn-outline-secondary btn-sm delete-btn" data-id="${thread.id}">
                <i class="fas fa-trash"></i> 
              </button>
            </div>
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
  
  function formatContent(content) {
    return content.split('\n').map(line => `<p class="mb-1">${line}</p>`).join('');
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
      currentPage = parseInt($(this).text());
      renderThreads();
    });
  }
  
  // Initial render
  $(document).ready(function() {
    renderThreads();
  });
  