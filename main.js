/* =====================================================
   KRISHIFARM - MAIN JAVASCRIPT
   ===================================================== */


/* =====================================================
   1. FARMER LOGIN
   ===================================================== */

const loginOverlay = document.getElementById("loginOverlay");
const closeLogin = document.getElementById("closeLogin");
const farmerForm = document.getElementById("farmerForm");

if (closeLogin) {
    closeLogin.addEventListener("click", function () {
        if (loginOverlay) {
            loginOverlay.style.display = "none";
        }
    });
}

if (farmerForm) {

    farmerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameElement = document.getElementById("farmerName");
        const locationElement = document.getElementById("farmerLocation");
        const phoneElement = document.getElementById("farmerPhone");

        const name = nameElement ? nameElement.value.trim() : "";
        const location = locationElement ? locationElement.value.trim() : "";
        const phone = phoneElement ? phoneElement.value.trim() : "";

        if (!name || !location) {
            alert("Please fill in all farmer details.");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        const farmerData = {
            name: name,
            location: location,
            phone: phone
        };

        localStorage.setItem(
            "krishiFarmer",
            JSON.stringify(farmerData)
        );

        if (loginOverlay) {
            loginOverlay.style.display = "none";
        }

        alert("Welcome to KrishiFarm, " + name + "!");
    });
}


/* =====================================================
   2. GET LOGGED-IN FARMER
   ===================================================== */

function getLoggedInFarmer() {

    const savedFarmer =
        localStorage.getItem("krishiFarmer");

    if (!savedFarmer) {
        return null;
    }

    try {
        return JSON.parse(savedFarmer);
    } catch (error) {
        return null;
    }
}


/* =====================================================
   3. DASHBOARD
   ===================================================== */

function loadFarmerDashboard() {

    const farmer = getLoggedInFarmer();

    if (!farmer) {

        const noData =
            document.getElementById("noFarmerData");

        if (noData) {
            noData.style.display = "block";
        }

        return;
    }

    const dashboardName =
        document.getElementById("dashboardName");

    const displayName =
        document.getElementById("displayName");

    const displayLocation =
        document.getElementById("displayLocation");

    const displayPhone =
        document.getElementById("displayPhone");

    if (dashboardName) {
        dashboardName.textContent = farmer.name;
    }

    if (displayName) {
        displayName.textContent = farmer.name;
    }

    if (displayLocation) {
        displayLocation.textContent = farmer.location;
    }

    if (displayPhone) {
        displayPhone.textContent = farmer.phone;
    }
}

loadFarmerDashboard();


/* =====================================================
   4. RESOURCE DATA
   ===================================================== */

function getResources() {

    const savedResources =
        localStorage.getItem("krishiResources");

    if (savedResources) {

        try {
            return JSON.parse(savedResources);
        } catch (error) {
            console.error("Resource data error:", error);
        }
    }

    const sampleResources = [

        {
            id: "R001",
            name: "Tractor",
            category: "Machines",
            description:
                "45 HP tractor available for farming operations.",
            location: "Jaipur, Rajasthan",
            latitude: 26.9124,
            longitude: 75.7873,
            price: 1500,
            type: "Rent",
            exchangeRequirement: "",
            owner: "Sample Farmer"
        },

        {
            id: "R002",
            name: "Water Pump",
            category: "Irrigation",
            description:
                "Diesel water pump suitable for field irrigation.",
            location: "Kota, Rajasthan",
            latitude: 25.2138,
            longitude: 75.8648,
            price: 800,
            type: "Rent",
            exchangeRequirement: "",
            owner: "Sample Farmer"
        },

        {
            id: "R003",
            name: "Crop Cutting Tool",
            category: "Tools",
            description:
                "Agricultural hand tool for crop cutting.",
            location: "Ajmer, Rajasthan",
            latitude: 26.4499,
            longitude: 74.6399,
            price: 500,
            type: "Sell",
            exchangeRequirement: "",
            owner: "Sample Farmer"
        }

    ];

    localStorage.setItem(
        "krishiResources",
        JSON.stringify(sampleResources)
    );

    return sampleResources;
}


/* =====================================================
   5. SAVE RESOURCES
   ===================================================== */

function saveResources(resources) {

    localStorage.setItem(
        "krishiResources",
        JSON.stringify(resources)
    );
}


/* =====================================================
   EXCHANGE TYPE HELPER
   ===================================================== */

function isExchangeType(type) {

    return String(type || "")
        .trim()
        .toLowerCase() === "exchange";
}


/* =====================================================
   6. ADD RESOURCE
   ===================================================== */

const resourceForm =
    document.getElementById("resourceForm");

if (resourceForm) {

    const typeElement =
        document.getElementById("resourceType");

    const priceElement =
        document.getElementById("resourcePrice");

    let priceContainer = null;

    if (priceElement) {

        priceContainer =
            priceElement.closest(".form-group");

        if (!priceContainer) {
            priceContainer =
                priceElement.closest("div");
        }
    }

    let priceLabel = null;

    if (priceElement) {

        priceLabel =
            document.querySelector(
                'label[for="resourcePrice"]'
            );
    }

    let exchangeContainer = null;

    if (typeElement) {

        exchangeContainer =
            document.createElement("div");

        exchangeContainer.id =
            "exchangeRequirementContainer";

        exchangeContainer.style.display =
            "none";

        exchangeContainer.innerHTML = `

            <label for="exchangeRequirement">
                🔄 What do you want in exchange?
            </label>

            <input
                type="text"
                id="exchangeRequirement"
                placeholder="Example: Wheat, seeds, fertilizer, another machine..."
            >

        `;

        if (typeElement.parentElement) {

            typeElement.parentElement.appendChild(
                exchangeContainer
            );
        }
    }


    /* ==========================================
       UPDATE RESOURCE TYPE UI
       ========================================== */

    function updateResourceTypeUI() {

        if (!typeElement) {
            return;
        }

        const selectedType =
            typeElement.value;

        const exchangeSelected =
            isExchangeType(selectedType);

        const exchangeInput =
            document.getElementById(
                "exchangeRequirement"
            );

        if (exchangeSelected) {

            if (priceContainer) {

                priceContainer.style.setProperty(
                    "display",
                    "none",
                    "important"
                );
            }

            if (priceLabel) {

                priceLabel.style.setProperty(
                    "display",
                    "none",
                    "important"
                );
            }

            if (priceElement) {

                priceElement.style.setProperty(
                    "display",
                    "none",
                    "important"
                );

                priceElement.required = false;
                priceElement.value = "";
            }

            if (exchangeContainer) {

                exchangeContainer.style.setProperty(
                    "display",
                    "block",
                    "important"
                );
            }

            if (exchangeInput) {
                exchangeInput.required = true;
            }

        } else {

            if (priceContainer) {

                priceContainer.style.setProperty(
                    "display",
                    "block",
                    "important"
                );
            }

            if (priceLabel) {

                priceLabel.style.setProperty(
                    "display",
                    "block",
                    "important"
                );
            }

            if (priceElement) {

                priceElement.style.setProperty(
                    "display",
                    "block",
                    "important"
                );

                priceElement.required = true;
            }

            if (exchangeContainer) {

                exchangeContainer.style.setProperty(
                    "display",
                    "none",
                    "important"
                );
            }

            if (exchangeInput) {

                exchangeInput.value = "";
                exchangeInput.required = false;
            }
        }
    }


    if (typeElement) {

        typeElement.addEventListener(
            "change",
            updateResourceTypeUI
        );

        updateResourceTypeUI();
    }


    /* ==========================================
       SUBMIT RESOURCE
       ========================================== */

    resourceForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const farmer =
                getLoggedInFarmer();

            if (!farmer) {

                alert(
                    "Please login first before adding a resource."
                );

                window.location.href =
                    "index.html";

                return;
            }

            const nameElement =
                document.getElementById(
                    "resourceName"
                );

            const categoryElement =
                document.getElementById(
                    "resourceCategory"
                );

            const descriptionElement =
                document.getElementById(
                    "resourceDescription"
                );

            const locationElement =
                document.getElementById(
                    "resourceLocation"
                );

            const priceElement =
                document.getElementById(
                    "resourcePrice"
                );

            const typeElement =
                document.getElementById(
                    "resourceType"
                );

            const exchangeRequirementElement =
                document.getElementById(
                    "exchangeRequirement"
                );

            const name =
                nameElement
                    ? nameElement.value.trim()
                    : "";

            const category =
                categoryElement
                    ? categoryElement.value
                    : "";

            const description =
                descriptionElement
                    ? descriptionElement.value.trim()
                    : "";

            const location =
                locationElement
                    ? locationElement.value.trim()
                    : "";

            const type =
                typeElement
                    ? typeElement.value.trim()
                    : "";

            const exchangeSelected =
                isExchangeType(type);

            let price = null;

            if (exchangeSelected) {

                price = null;

            } else {

                price =
                    priceElement
                        ? Number(priceElement.value)
                        : NaN;
            }

            const exchangeRequirement =
                exchangeSelected &&
                exchangeRequirementElement
                    ? exchangeRequirementElement.value.trim()
                    : "";

            if (
                !name ||
                !category ||
                !description ||
                !location ||
                !type
            ) {

                alert(
                    "Please fill all resource details."
                );

                return;
            }

            if (!exchangeSelected) {

                if (
                    isNaN(price) ||
                    price < 0
                ) {

                    alert(
                        "Please enter a valid price."
                    );

                    return;
                }
            }

            if (
                exchangeSelected &&
                !exchangeRequirement
            ) {

                alert(
                    "Please mention what you want in exchange."
                );

                return;
            }


            /* ==========================================
               NEW MAP CHANGE
               GEOCODE RESOURCE LOCATION
               ========================================== */

            let coordinates = null;

            try {

                coordinates =
                    await geocodeResourceLocation(
                        location
                    );

            } catch (error) {

                console.error(
                    "Location geocoding error:",
                    error
                );
            }


            const savedType =
                exchangeSelected
                    ? "Exchange"
                    : type;


            /* ==========================================
               CREATE RESOURCE
               ========================================== */

            const newResource = {

                id:
                    "R" + Date.now(),

                name:
                    name,

                category:
                    category,

                description:
                    description,

                location:
                    location,

                /* NEW: MAP COORDINATES */

                latitude:
                    coordinates
                        ? coordinates.lat
                        : null,

                longitude:
                    coordinates
                        ? coordinates.lng
                        : null,

                price:
                    price,

                type:
                    savedType,

                exchangeRequirement:
                    exchangeRequirement,

                owner:
                    farmer.name
            };


            /* ==========================================
               SAVE RESOURCE
               ========================================== */

            const resources =
                getResources();

            resources.push(
                newResource
            );

            saveResources(
                resources
            );


            if (coordinates) {

                alert(
                    "Resource added successfully!\n\n" +
                    "The resource location has also been added to the map."
                );

            } else {

                alert(
                    "Resource added successfully!\n\n" +
                    "The location could not be found on the map."
                );
            }


            window.location.href =
                "resources.html";

        }
    );
}


/* =====================================================
   7. RESOURCE ICON
   ===================================================== */

function getResourceIcon(category) {

    const icons = {

        "Irrigation": "💧",
        "Equipment": "🚜",
        "Tools": "🛠️",
        "Machines": "⚙️",
        "Cattle Feed": "🌾",
        "Crop Residues": "🌱"

    };

    return icons[category] || "🌾";
}


/* =====================================================
   8. DISPLAY RESOURCES
   ===================================================== */

function displayResources() {

    const container =
        document.getElementById("resourceContainer");

    if (!container) {
        return;
    }

    const searchInput =
        document.getElementById("searchResource");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const search =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    const category =
        categoryFilter
            ? categoryFilter.value
            : "all";

    let resources =
        getResources();

    resources =
        resources.filter(function (resource) {

            const matchesSearch =

                resource.name
                    .toLowerCase()
                    .includes(search)

                ||

                resource.description
                    .toLowerCase()
                    .includes(search)

                ||

                resource.location
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =

                category === "all"

                ||

                resource.category === category;

            return matchesSearch &&
                   matchesCategory;
        });

    container.innerHTML = "";

    const resourceCount =
        document.getElementById("resourceCount");

    if (resourceCount) {

        resourceCount.textContent =
            "Resources available: " +
            resources.length;
    }

    const noResources =
        document.getElementById("noResources");

    if (resources.length === 0) {

        if (noResources) {
            noResources.style.display = "block";
        }

        return;
    }

    if (noResources) {
        noResources.style.display = "none";
    }

    resources.forEach(function (resource) {

        const card =
            document.createElement("div");

        card.className =
            "resource-item";

        const exchangeSelected =
            isExchangeType(resource.type);

        const priceHTML =
            !exchangeSelected
                ?
                `
                <p>
                    💰 ₹${resource.price}
                </p>
                `
                :
                "";

        const exchangeHTML =
            exchangeSelected &&
            resource.exchangeRequirement
                ?
                `
                <p>
                    🎯 <strong>Wants in Exchange:</strong>
                    ${resource.exchangeRequirement}
                </p>
                `
                :
                "";

        card.innerHTML = `

            <div class="resource-icon">
                ${getResourceIcon(resource.category)}
            </div>

            <span class="resource-category">
                ${resource.category}
            </span>

            <h2>
                ${resource.name}
            </h2>

            <p class="resource-description">
                ${resource.description}
            </p>

            <div class="resource-info">

                <p>
                    📍 ${resource.location}
                </p>

                <p>
                    👨‍🌾 Owner: ${resource.owner}
                </p>

                ${priceHTML}

                <p>
                    🔄 ${exchangeSelected ? "Exchange" : resource.type}
                </p>

                ${exchangeHTML}

            </div>

            <button
                class="book-resource-btn"
                onclick="openBooking('${resource.id}')"
            >
                📅 Book Resource
            </button>

        `;

        container.appendChild(card);

    });
}


/* =====================================================
   9. SEARCH
   ===================================================== */

const searchResource =
    document.getElementById("searchResource");

if (searchResource) {

    searchResource.addEventListener(
        "input",
        displayResources
    );
}


/* =====================================================
   10. CATEGORY FILTER
   ===================================================== */

const categoryFilter =
    document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        displayResources
    );
}

displayResources();


/* =====================================================
   11. OPEN BOOKING
   ===================================================== */

function openBooking(resourceId) {

    const resources =
        getResources();

    const resource =
        resources.find(function (item) {

            return item.id === resourceId;

        });

    if (!resource) {

        alert("Resource not found.");

        return;
    }

    localStorage.setItem(
        "selectedResource",
        JSON.stringify(resource)
    );

    window.location.href =
        "booking.html";
}


/* =====================================================
   12. LOAD BOOKING PAGE
   ===================================================== */

function loadBookingPage() {

    const details =
        document.getElementById("bookingDetails");

    if (!details) {
        return;
    }

    const savedResource =
        localStorage.getItem("selectedResource");

    if (!savedResource) {

        details.innerHTML = `

            <h2>Resource Not Found</h2>

            <p>
                Please select a resource again.
            </p>

        `;

        return;
    }

    let resource;

    try {

        resource =
            JSON.parse(savedResource);

    } catch (error) {

        details.innerHTML =
            "<p>Resource information is invalid.</p>";

        return;
    }

    const exchangeSelected =
        isExchangeType(resource.type);

    const priceHTML =
        !exchangeSelected
            ?
            `
            <p class="booking-price">
                ₹${resource.price} / unit
            </p>
            `
            :
            `
            <p class="booking-exchange">
                🔄 <strong>Exchange Requirement:</strong>
                ${resource.exchangeRequirement || "Not specified"}
            </p>
            `;

    details.innerHTML = `

        <h2>
            ${getResourceIcon(resource.category)}
            ${resource.name}
        </h2>

        <p>
            <strong>Category:</strong>
            ${resource.category}
        </p>

        <p>
            <strong>Description:</strong>
            ${resource.description}
        </p>

        <p>
            <strong>Location:</strong>
            ${resource.location}
        </p>

        <p>
            <strong>Owner:</strong>
            ${resource.owner}
        </p>

        <p>
            <strong>Booking Type:</strong>
            ${exchangeSelected ? "Exchange" : resource.type}
        </p>

        ${priceHTML}

    `;

    const dateInput =
        document.getElementById("bookingDate");

    if (dateInput) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        dateInput.min = today;
    }
}

loadBookingPage();


/* =====================================================
   13. PROCEED TO CONFIRMATION
   ===================================================== */

const proceedBooking =
    document.getElementById("proceedBooking");

if (proceedBooking) {

    proceedBooking.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const dateInput =
                document.getElementById("bookingDate");

            const date =
                dateInput
                    ? dateInput.value
                    : "";

            if (!date) {

                alert(
                    "Please select a booking date."
                );

                return;
            }

            let durationInput =
                document.getElementById(
                    "bookingDuration"
                );

            if (!durationInput) {

                durationInput =
                    document.getElementById(
                        "bookingQuantity"
                    );
            }

            if (!durationInput) {

                durationInput =
                    document.getElementById(
                        "quantity"
                    );
            }

            if (!durationInput) {

                durationInput =
                    document.getElementById(
                        "duration"
                    );
            }

            let duration = 1;

            if (durationInput) {

                const enteredValue =
                    durationInput.value.trim();

                if (enteredValue !== "") {

                    duration =
                        Number(enteredValue);

                    if (
                        isNaN(duration) ||
                        duration < 1
                    ) {

                        alert(
                            "Please enter a valid duration or quantity."
                        );

                        return;
                    }
                }
            }

            const savedResource =
                localStorage.getItem(
                    "selectedResource"
                );

            if (!savedResource) {

                alert(
                    "Resource information is missing. Please select the resource again."
                );

                window.location.href =
                    "resources.html";

                return;
            }

            let resource;

            try {

                resource =
                    JSON.parse(savedResource);

            } catch (error) {

                alert(
                    "Resource information is invalid."
                );

                window.location.href =
                    "resources.html";

                return;
            }

            const isExchange =
                isExchangeType(resource.type);

            const totalPrice =
                isExchange
                    ? null
                    : Number(resource.price) *
                      Number(duration);

            const bookingData = {

                resourceId:
                    resource.id,

                resourceName:
                    resource.name,

                category:
                    resource.category,

                description:
                    resource.description,

                location:
                    resource.location,

                owner:
                    resource.owner,

                bookingType:
                    isExchange
                        ? "Exchange"
                        : resource.type,

                exchangeRequirement:
                    isExchange
                        ? resource.exchangeRequirement
                        : "",

                pricePerUnit:
                    isExchange
                        ? null
                        : Number(resource.price),

                date:
                    date,

                duration:
                    Number(duration),

                totalPrice:
                    totalPrice,

                status:
                    "Pending"
            };

            localStorage.setItem(
                "pendingBooking",
                JSON.stringify(bookingData)
            );

            console.log(
                "Pending booking saved:",
                bookingData
            );

            window.location.href =
                "confirm-booking.html";

        }
    );
}


/* =====================================================
   14. LOAD CONFIRMATION PAGE
   ===================================================== */

function loadConfirmationPage() {

    const details =
        document.getElementById(
            "confirmationDetails"
        );

    if (!details) {
        return;
    }

    const savedBooking =
        localStorage.getItem(
            "pendingBooking"
        );

    if (!savedBooking) {

        details.innerHTML = `

            <div class="no-booking-message">

                <h2>
                    ⚠️ No Booking Found
                </h2>

                <p>
                    Please select a resource and
                    complete the booking form again.
                </p>

                <a
                    href="resources.html"
                    class="back-btn"
                >
                    ← Back to Resources
                </a>

            </div>

        `;

        return;
    }

    let booking;

    try {

        booking =
            JSON.parse(savedBooking);

    } catch (error) {

        console.error(
            "Booking data error:",
            error
        );

        details.innerHTML =
            "<p>Booking data is invalid.</p>";

        return;
    }

    const duration =
        booking.duration || 1;

    const exchangeSelected =
        isExchangeType(booking.bookingType);

    const transactionHTML =
        exchangeSelected
            ?
            `
            <div class="confirmation-row">

                <strong>
                    🎯 Exchange Requirement:
                </strong>

                <span>
                    ${booking.exchangeRequirement || "N/A"}
                </span>

            </div>

            <div class="confirmation-total">

                <strong>
                    🔄 Exchange
                </strong>

                <span>
                    Barter - No Monetary Payment
                </span>

            </div>
            `
            :
            `
            <div class="confirmation-row">

                <strong>
                    💰 Price per unit:
                </strong>

                <span>
                    ₹${booking.pricePerUnit || 0}
                </span>

            </div>

            <div class="confirmation-total">

                <strong>
                    Total Price
                </strong>

                <span>
                    ₹${booking.totalPrice || 0}
                </span>

            </div>
            `;

    details.innerHTML = `

        <div class="confirmation-row">

            <strong>
                🌾 Resource:
            </strong>

            <span>
                ${booking.resourceName || "N/A"}
            </span>

        </div>

        <div class="confirmation-row">

            <strong>
                📂 Category:
            </strong>

            <span>
                ${booking.category || "N/A"}
            </span>

        </div>

        <div class="confirmation-row">

            <strong>
                📍 Location:
            </strong>

            <span>
                ${booking.location || "N/A"}
            </span>

        </div>

        <div class="confirmation-row">

            <strong>
                👨‍🌾 Owner:
            </strong>

            <span>
                ${booking.owner || "N/A"}
            </span>

        </div>

        <div class="confirmation-row">

            <strong>
                🔄 Booking Type:
            </strong>

            <span>
                ${exchangeSelected ? "Exchange" : booking.bookingType || "N/A"}
            </span>

        </div>

        <div class="confirmation-row">

            <strong>
                📅 Date:
            </strong>

            <span>
                ${booking.date || "N/A"}
            </span>

        </div>

        <div class="confirmation-row">

            <strong>
                ⏱️ Duration / Quantity:
            </strong>

            <span>
                ${duration}
            </span>

        </div>

        ${transactionHTML}

    `;
}


/* =====================================================
   15. CONFIRM BOOKING
   ===================================================== */

function setupConfirmBooking() {

    const confirmButton =
        document.getElementById(
            "confirmBooking"
        );

    if (!confirmButton) {
        return;
    }

    confirmButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const farmer =
                getLoggedInFarmer();

            if (!farmer) {

                alert(
                    "Please login before confirming your booking."
                );

                window.location.href =
                    "index.html";

                return;
            }

            const savedBooking =
                localStorage.getItem(
                    "pendingBooking"
                );

            if (!savedBooking) {

                alert(
                    "Booking information not found. Please book the resource again."
                );

                return;
            }

            let booking;

            try {

                booking =
                    JSON.parse(savedBooking);

            } catch (error) {

                console.error(
                    "Booking JSON error:",
                    error
                );

                alert(
                    "There was a problem with your booking information."
                );

                return;
            }

            if (
                !booking.duration ||
                Number(booking.duration) < 1
            ) {

                booking.duration = 1;
            }

            const exchangeSelected =
                isExchangeType(
                    booking.bookingType
                );

            if (exchangeSelected) {

                booking.bookingType =
                    "Exchange";

                booking.pricePerUnit =
                    null;

                booking.totalPrice =
                    null;

            } else {

                booking.totalPrice =
                    Number(booking.pricePerUnit) *
                    Number(booking.duration);
            }

            const bookingId =
                "KF" + Date.now();

            booking.bookingId =
                bookingId;

            booking.status =
                "Confirmed";

            booking.bookedAt =
                new Date().toLocaleString();

            booking.farmerName =
                farmer.name;

            booking.farmerPhone =
                farmer.phone;

            let bookings = [];

            const savedBookings =
                localStorage.getItem(
                    "krishiBookings"
                );

            if (savedBookings) {

                try {

                    bookings =
                        JSON.parse(
                            savedBookings
                        );

                    if (!Array.isArray(bookings)) {
                        bookings = [];
                    }

                } catch (error) {

                    bookings = [];
                }
            }

            bookings.push(
                booking
            );

            localStorage.setItem(
                "krishiBookings",
                JSON.stringify(bookings)
            );

            localStorage.removeItem(
                "pendingBooking"
            );

            const confirmationArea =
                document.getElementById(
                    "confirmationArea"
                );

            const successArea =
                document.getElementById(
                    "successArea"
                );

            if (confirmationArea) {

                confirmationArea.style.display =
                    "none";
            }

            if (successArea) {

                successArea.style.display =
                    "block";
            }

            const bookingIdElement =
                document.getElementById(
                    "bookingId"
                );

            if (bookingIdElement) {

                bookingIdElement.textContent =
                    "Booking ID: " +
                    bookingId;
            }

            alert(
                "Booking confirmed successfully!"
            );

        }
    );
}


/* =====================================================
   16. HOMEPAGE RESOURCE SEARCH
   ===================================================== */

const homeSearchInput =
    document.getElementById(
        "homeSearchResource"
    );

const homeCategoryFilter =
    document.getElementById(
        "homeCategoryFilter"
    );

const homeTypeFilter =
    document.getElementById(
        "homeTypeFilter"
    );

const homeSearchBtn =
    document.getElementById(
        "homeSearchBtn"
    );

if (homeSearchBtn) {

    homeSearchBtn.addEventListener(
        "click",
        function () {

            const search =
                homeSearchInput
                    ? homeSearchInput.value.trim()
                    : "";

            const category =
                homeCategoryFilter
                    ? homeCategoryFilter.value
                    : "all";

            const type =
                homeTypeFilter
                    ? homeTypeFilter.value
                    : "all";

            sessionStorage.setItem(
                "resourceSearch",
                search
            );

            sessionStorage.setItem(
                "resourceCategory",
                category
            );

            sessionStorage.setItem(
                "resourceType",
                type
            );

            window.location.href =
                "resources.html";

        }
    );
}


/* =====================================================
   17. MY RESOURCES
   ===================================================== */

function displayMyResources() {

    const container =
        document.getElementById(
            "myResourcesContainer"
        );

    if (!container) {
        return;
    }

    const noResources =
        document.getElementById(
            "noMyResources"
        );

    const farmer =
        getLoggedInFarmer();

    if (!farmer) {

        container.innerHTML = "";

        if (noResources) {

            noResources.innerHTML = `

                <div>🔐</div>

                <h2>
                    Please Login First
                </h2>

                <p>
                    You need to login before
                    viewing your resources.
                </p>

                <a
                    href="index.html"
                    class="add-resource-dashboard-btn"
                >
                    Go to Homepage
                </a>

            `;

            noResources.style.display =
                "block";
        }

        return;
    }

    const farmerName =
        document.getElementById(
            "myResourceFarmerName"
        );

    const farmerLocation =
        document.getElementById(
            "myResourceFarmerLocation"
        );

    if (farmerName) {
        farmerName.textContent =
            farmer.name;
    }

    if (farmerLocation) {
        farmerLocation.textContent =
            farmer.location;
    }

    const resources =
        getResources();

    const myResources =
        resources.filter(function (resource) {

            return resource.owner ===
                farmer.name;

        });

    container.innerHTML = "";

    if (myResources.length === 0) {

        if (noResources) {

            noResources.style.display =
                "block";
        }

        return;
    }

    if (noResources) {

        noResources.style.display =
            "none";
    }

    myResources.forEach(function (resource) {

        const card =
            document.createElement("div");

        card.className =
            "my-resource-card";

        let typeClass = "";

        if (resource.type === "Rent") {

            typeClass =
                "resource-type-rent";

        } else if (resource.type === "Sell") {

            typeClass =
                "resource-type-sell";

        } else if (
            isExchangeType(resource.type)
        ) {

            typeClass =
                "resource-type-exchange";
        }

        const exchangeSelected =
            isExchangeType(resource.type);

        const priceHTML =
            !exchangeSelected
                ?
                `
                <p>
                    💰
                    <strong>Price:</strong>
                    ₹${resource.price}
                </p>
                `
                :
                `
                <p>
                    🎯
                    <strong>Wants in Exchange:</strong>
                    ${resource.exchangeRequirement || "N/A"}
                </p>
                `;

        card.innerHTML = `

            <div class="my-resource-icon">
                ${getResourceIcon(resource.category)}
            </div>

            <span class="my-resource-category">
                ${resource.category}
            </span>

            <h3>
                ${resource.name}
            </h3>

            <p class="my-resource-description">
                ${resource.description}
            </p>

            <div class="my-resource-info">

                <p>
                    📍
                    <strong>Location:</strong>
                    ${resource.location}
                </p>

                ${priceHTML}

                <p>
                    🔄
                    <strong>Type:</strong>

                    <span class="${typeClass}">
                        ${exchangeSelected ? "Exchange" : resource.type}
                    </span>
                </p>

                <p>
                    🆔
                    <strong>Resource ID:</strong>
                    ${resource.id}
                </p>

            </div>

            <div class="resource-action-buttons">

                <button
                    type="button"
                    class="edit-resource-btn"
                    onclick="openEditResource('${resource.id}')"
                >
                    ✏️ Edit
                </button>

                <button
                    type="button"
                    class="delete-resource-btn"
                    onclick="deleteResource('${resource.id}')"
                >
                    🗑️ Delete
                </button>

            </div>

        `;

        container.appendChild(card);

    });
}


/* =====================================================
   17A. DELETE RESOURCE
   ===================================================== */

function deleteResource(resourceId) {

    if (!resourceId) {

        alert(
            "Resource ID not found."
        );

        return;
    }

    const farmer =
        getLoggedInFarmer();

    if (!farmer) {

        alert(
            "Please login first."
        );

        return;
    }

    let resources =
        getResources();

    const resource =
        resources.find(function (item) {

            return item.id === resourceId;

        });

    if (!resource) {

        alert(
            "Resource not found."
        );

        return;
    }

    if (resource.owner !== farmer.name) {

        alert(
            "You can only delete your own resources."
        );

        return;
    }

    const confirmDelete =
        confirm(
            "Are you sure you want to delete \"" +
            resource.name +
            "\"?\n\nThis resource will be removed from both My Resources and the Resources page."
        );

    if (!confirmDelete) {
        return;
    }

    resources =
        resources.filter(function (item) {

            return item.id !== resourceId;

        });

    saveResources(
        resources
    );

    const selectedResource =
        localStorage.getItem(
            "selectedResource"
        );

    if (selectedResource) {

        try {

            const selected =
                JSON.parse(
                    selectedResource
                );

            if (
                selected &&
                selected.id === resourceId
            ) {

                localStorage.removeItem(
                    "selectedResource"
                );
            }

        } catch (error) {

            console.error(
                "Selected resource data error:",
                error
            );
        }
    }

    displayMyResources();
    displayResources();

    /*
       NEW MAP CHANGE:
       Refresh map after deleting resource.
    */

    refreshResourceMap();

    alert(
        "Resource deleted successfully!"
    );
}


/* =====================================================
   18. EDIT RESOURCE
   ===================================================== */

let resourceBeingEdited = null;


/* =====================================================
   CREATE EDIT MODAL
   ===================================================== */

function createEditResourceModal() {

    let modal =
        document.getElementById(
            "editResourceModal"
        );

    if (modal) {
        return modal;
    }

    modal =
        document.createElement("div");

    modal.id =
        "editResourceModal";

    modal.innerHTML = `

        <div class="edit-resource-modal-content">

            <button
                type="button"
                id="closeEditModal"
                class="close-edit-modal"
            >
                ×
            </button>

            <h2>
                ✏️ Edit Resource
            </h2>

            <div class="edit-form-group">

                <label for="editResourceName">
                    Resource Name
                </label>

                <input
                    type="text"
                    id="editResourceName"
                    readonly
                >

            </div>

            <div class="edit-form-group">

                <label for="editResourceLocation">
                    📍 Location
                </label>

                <input
                    type="text"
                    id="editResourceLocation"
                    placeholder="Enter resource location"
                >

            </div>

            <div class="edit-form-group">

                <label for="editResourceType">
                    🔄 Type
                </label>

                <select id="editResourceType">

                    <option value="Rent">
                        Rent
                    </option>

                    <option value="Sell">
                        Sell
                    </option>

                    <option value="Exchange">
                        Exchange
                    </option>

                </select>

            </div>

            <div
                class="edit-form-group"
                id="editPriceContainer"
            >

                <label for="editResourcePrice">
                    💰 Price
                </label>

                <input
                    type="number"
                    id="editResourcePrice"
                    min="0"
                    placeholder="Enter price"
                >

            </div>

            <div
                class="edit-form-group"
                id="editExchangeRequirementContainer"
                style="display: none;"
            >

                <label for="editExchangeRequirement">
                    🔄 What do you want in exchange?
                </label>

                <input
                    type="text"
                    id="editExchangeRequirement"
                    placeholder="Example: Wheat, seeds, fertilizer..."
                >

            </div>

            <div class="edit-resource-buttons">

                <button
                    type="button"
                    id="saveEditedResource"
                    class="save-edit-btn"
                >
                    💾 Save Changes
                </button>

                <button
                    type="button"
                    id="cancelEditResource"
                    class="cancel-edit-btn"
                >
                    Cancel
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(modal);

    const typeElement =
        document.getElementById(
            "editResourceType"
        );

    const priceContainer =
        document.getElementById(
            "editPriceContainer"
        );

    const priceElement =
        document.getElementById(
            "editResourcePrice"
        );

    const exchangeContainer =
        document.getElementById(
            "editExchangeRequirementContainer"
        );

    const exchangeElement =
        document.getElementById(
            "editExchangeRequirement"
        );


    function updateEditTypeUI() {

        if (!typeElement) {
            return;
        }

        const selectedType =
            typeElement.value
                .trim()
                .toLowerCase();

        if (selectedType === "exchange") {

            if (priceContainer) {
                priceContainer.style.display =
                    "none";
            }

            if (priceElement) {

                priceElement.value = "";
                priceElement.required = false;
            }

            if (exchangeContainer) {
                exchangeContainer.style.display =
                    "block";
            }

            if (exchangeElement) {
                exchangeElement.required = true;
            }

        } else {

            if (priceContainer) {
                priceContainer.style.display =
                    "block";
            }

            if (priceElement) {
                priceElement.required = true;
            }

            if (exchangeContainer) {
                exchangeContainer.style.display =
                    "none";
            }

            if (exchangeElement) {

                exchangeElement.value = "";
                exchangeElement.required = false;
            }
        }
    }


    if (typeElement) {

        typeElement.addEventListener(
            "change",
            updateEditTypeUI
        );
    }


    const closeButton =
        document.getElementById(
            "closeEditModal"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeEditResourceModal
        );
    }


    const cancelButton =
        document.getElementById(
            "cancelEditResource"
        );

    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeEditResourceModal
        );
    }


    const saveButton =
        document.getElementById(
            "saveEditedResource"
        );

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            saveEditedResourceData
        );
    }


    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeEditResourceModal();

            }
        }
    );

    return modal;
}


/* =====================================================
   OPEN EDIT RESOURCE
   ===================================================== */

function openEditResource(resourceId) {

    const resources =
        getResources();

    const resource =
        resources.find(function (item) {

            return item.id === resourceId;

        });

    if (!resource) {

        alert("Resource not found.");

        return;
    }

    const farmer =
        getLoggedInFarmer();

    if (!farmer) {

        alert("Please login first.");

        return;
    }

    if (resource.owner !== farmer.name) {

        alert(
            "You can only edit your own resources."
        );

        return;
    }

    resourceBeingEdited =
        resourceId;

    const modal =
        createEditResourceModal();

    const nameElement =
        document.getElementById(
            "editResourceName"
        );

    const locationElement =
        document.getElementById(
            "editResourceLocation"
        );

    const typeElement =
        document.getElementById(
            "editResourceType"
        );

    const priceElement =
        document.getElementById(
            "editResourcePrice"
        );

    const priceContainer =
        document.getElementById(
            "editPriceContainer"
        );

    const exchangeContainer =
        document.getElementById(
            "editExchangeRequirementContainer"
        );

    const exchangeElement =
        document.getElementById(
            "editExchangeRequirement"
        );

    if (nameElement) {
        nameElement.value =
            resource.name || "";
    }

    if (locationElement) {
        locationElement.value =
            resource.location || "";
    }

    const savedType =
        String(resource.type || "")
            .trim()
            .toLowerCase();

    if (savedType === "exchange") {

        if (typeElement) {
            typeElement.value =
                "Exchange";
        }

        if (priceContainer) {
            priceContainer.style.display =
                "none";
        }

        if (priceElement) {

            priceElement.value = "";
            priceElement.required = false;
        }

        if (exchangeContainer) {
            exchangeContainer.style.display =
                "block";
        }

        if (exchangeElement) {

            exchangeElement.value =
                resource.exchangeRequirement || "";

            exchangeElement.required = true;
        }

    } else {

        let normalType =
            "Rent";

        if (savedType === "sell") {
            normalType = "Sell";
        }

        if (savedType === "rent") {
            normalType = "Rent";
        }

        if (typeElement) {
            typeElement.value =
                normalType;
        }

        if (priceContainer) {
            priceContainer.style.display =
                "block";
        }

        if (priceElement) {

            priceElement.value =
                resource.price ?? "";

            priceElement.required = true;
        }

        if (exchangeContainer) {
            exchangeContainer.style.display =
                "none";
        }

        if (exchangeElement) {

            exchangeElement.value = "";
            exchangeElement.required = false;
        }
    }

    if (modal) {

        modal.style.display =
            "flex";
    }
}


/* =====================================================
   19. SAVE EDITED RESOURCE
   ===================================================== */

async function saveEditedResourceData() {

    if (!resourceBeingEdited) {

        alert(
            "No resource selected for editing."
        );

        return;
    }

    const locationElement =
        document.getElementById(
            "editResourceLocation"
        );

    const typeElement =
        document.getElementById(
            "editResourceType"
        );

    const priceElement =
        document.getElementById(
            "editResourcePrice"
        );

    const exchangeElement =
        document.getElementById(
            "editExchangeRequirement"
        );

    const location =
        locationElement
            ? locationElement.value.trim()
            : "";

    const type =
        typeElement
            ? typeElement.value.trim()
            : "";

    if (!location) {

        alert(
            "Please enter a location."
        );

        return;
    }

    if (!type) {

        alert(
            "Please select a resource type."
        );

        return;
    }

    const resources =
        getResources();

    const index =
        resources.findIndex(
            function (resource) {

                return (
                    resource.id ===
                    resourceBeingEdited
                );

            }
        );

    if (index === -1) {

        alert(
            "Resource not found."
        );

        return;
    }

    const resource =
        resources[index];

    const farmer =
        getLoggedInFarmer();

    if (!farmer) {

        alert(
            "Please login first."
        );

        return;
    }

    if (resource.owner !== farmer.name) {

        alert(
            "You can only edit your own resources."
        );

        return;
    }


    /* =================================================
       UPDATE LOCATION
       ================================================= */

    resource.location =
        location;


    /* =================================================
       NEW MAP CHANGE:
       UPDATE LATITUDE/LONGITUDE
       ================================================= */

    let updatedCoordinates =
        null;

    try {

        updatedCoordinates =
            await geocodeResourceLocation(
                location
            );

    } catch (error) {

        console.error(
            "Could not update map location:",
            error
        );
    }


    if (updatedCoordinates) {

        resource.latitude =
            updatedCoordinates.lat;

        resource.longitude =
            updatedCoordinates.lng;

    } else {

        resource.latitude =
            null;

        resource.longitude =
            null;
    }


    /* =================================================
       EXCHANGE
       ================================================= */

    if (
        type.toLowerCase() ===
        "exchange"
    ) {

        const exchangeRequirement =
            exchangeElement
                ? exchangeElement.value.trim()
                : "";

        if (!exchangeRequirement) {

            alert(
                "Please mention what you want in exchange."
            );

            return;
        }

        resource.type =
            "Exchange";

        resource.price =
            null;

        resource.exchangeRequirement =
            exchangeRequirement;

    }


    /* =================================================
       RENT / SELL
       ================================================= */

    else {

        const price =
            priceElement
                ? Number(priceElement.value)
                : NaN;

        if (
            isNaN(price) ||
            price < 0
        ) {

            alert(
                "Please enter a valid price."
            );

            return;
        }

        resource.type =
            type === "Sell"
                ? "Sell"
                : "Rent";

        resource.price =
            price;

        resource.exchangeRequirement =
            "";
    }


    /* =================================================
       SAVE TO LOCAL STORAGE
       ================================================= */

    saveResources(
        resources
    );


    /* =================================================
       CLOSE MODAL
       ================================================= */

    closeEditResourceModal();


    /* =================================================
       REFRESH RESOURCE LISTS
       ================================================= */

    displayMyResources();

    displayResources();


    /* =================================================
       NEW MAP CHANGE:
       REFRESH MAP AFTER EDIT
       ================================================= */

    refreshResourceMap();


    alert(
        "Resource updated successfully!"
    );
}


/* =====================================================
   20. CLOSE EDIT MODAL
   ===================================================== */

function closeEditResourceModal() {

    const modal =
        document.getElementById(
            "editResourceModal"
        );

    if (modal) {

        modal.style.display =
            "none";
    }

    resourceBeingEdited =
        null;
}


/* =====================================================
   21. CANCEL EDIT
   ===================================================== */

function cancelEditResource() {

    closeEditResourceModal();
}


/* =====================================================
   22. CLICK OUTSIDE EDIT MODAL
   ===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "editResourceModal"
            );

        if (!modal) {
            return;
        }

        if (event.target === modal) {

            closeEditResourceModal();

        }
    }
);


/* =====================================================
   23. RUN MY RESOURCES
   ===================================================== */

displayMyResources();


/* =====================================================
   24. LOAD CONFIRMATION
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadConfirmationPage();

        setupConfirmBooking();

        displayMyBookings();

    }
);


/* =====================================================
   25. GET ALL BOOKINGS
   ===================================================== */

function getMyBookings() {

    const savedBookings =
        localStorage.getItem(
            "krishiBookings"
        );

    if (!savedBookings) {
        return [];
    }

    try {

        const bookings =
            JSON.parse(savedBookings);

        if (!Array.isArray(bookings)) {
            return [];
        }

        return bookings;

    } catch (error) {

        console.error(
            "Error reading bookings:",
            error
        );

        return [];
    }
}


/* =====================================================
   26. DISPLAY MY BOOKINGS
   ===================================================== */

function displayMyBookings() {

    const container =
        document.getElementById(
            "myBookingsContainer"
        );

    if (!container) {
        return;
    }

    const noBookings =
        document.getElementById(
            "noBookings"
        );

    const farmer =
        getLoggedInFarmer();

    container.innerHTML = "";

    if (!farmer) {

        if (noBookings) {

            noBookings.innerHTML = `

                <div>🔐</div>

                <h2>
                    Please Login First
                </h2>

                <p>
                    Login to see your bookings.
                </p>

                <a
                    href="index.html"
                    class="add-resource-dashboard-btn"
                >
                    Go to Homepage
                </a>

            `;

            noBookings.style.display =
                "block";
        }

        return;
    }

    const allBookings =
        getMyBookings();

    const bookings =
        allBookings.filter(function (booking) {

            return (
                booking.farmerPhone &&
                booking.farmerPhone ===
                farmer.phone
            );

        });

    const bookingCount =
        document.getElementById(
            "bookingCount"
        );

    if (bookingCount) {

        bookingCount.textContent =
            "Total Bookings: " +
            bookings.length;
    }

    if (bookings.length === 0) {

        if (noBookings) {

            noBookings.style.display =
                "block";
        }

        return;
    }

    if (noBookings) {

        noBookings.style.display =
            "none";
    }

    bookings.forEach(
        function (booking) {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "my-booking-card";

            let statusClass =
                "booking-status";

            if (
                booking.status ===
                "Cancelled"
            ) {

                statusClass =
                    "booking-status cancelled";
            }

            const exchangeSelected =
                isExchangeType(
                    booking.bookingType
                );

            const transactionHTML =
                exchangeSelected
                    ?
                    `
                    <div class="booking-detail-row">

                        <strong>
                            🎯 Exchange For
                        </strong>

                        <span>
                            ${booking.exchangeRequirement || "N/A"}
                        </span>

                    </div>
                    `
                    :
                    `
                    <div class="booking-detail-row">

                        <strong>
                            💰 Price per Unit
                        </strong>

                        <span>
                            ₹${booking.pricePerUnit || 0}
                        </span>

                    </div>

                    <div class="booking-detail-row total-row">

                        <strong>
                            Total Price
                        </strong>

                        <span>
                            ₹${booking.totalPrice || 0}
                        </span>

                    </div>
                    `;

            card.innerHTML = `

                <div class="booking-card-top">

                    <div class="booking-resource-icon">

                        ${getResourceIcon(
                            booking.category
                        )}

                    </div>

                    <div>

                        <span class="booking-category">

                            ${booking.category || "Resource"}

                        </span>

                        <h2>

                            ${booking.resourceName || "Unknown Resource"}

                        </h2>

                    </div>

                </div>

                <div class="booking-details">

                    <div class="booking-detail-row">

                        <strong>
                            🆔 Booking ID
                        </strong>

                        <span>
                            ${booking.bookingId || "N/A"}
                        </span>

                    </div>

                    <div class="booking-detail-row">

                        <strong>
                            📍 Location
                        </strong>

                        <span>
                            ${booking.location || "N/A"}
                        </span>

                    </div>

                    <div class="booking-detail-row">

                        <strong>
                            👨‍🌾 Owner
                        </strong>

                        <span>
                            ${booking.owner || "N/A"}
                        </span>

                    </div>

                    <div class="booking-detail-row">

                        <strong>
                            🔄 Booking Type
                        </strong>

                        <span>
                            ${exchangeSelected ? "Exchange" : booking.bookingType || "N/A"}
                        </span>

                    </div>

                    <div class="booking-detail-row">

                        <strong>
                            📅 Booking Date
                        </strong>

                        <span>
                            ${booking.date || "N/A"}
                        </span>

                    </div>

                    <div class="booking-detail-row">

                        <strong>
                            ⏱️ Duration / Quantity
                        </strong>

                        <span>
                            ${booking.duration || "N/A"}
                        </span>

                    </div>

                    ${transactionHTML}

                </div>

                <div class="booking-card-bottom">

                    <span class="${statusClass}">

                        ${booking.status || "Confirmed"}

                    </span>

                    ${
                        booking.status !== "Cancelled"

                        ?

                        `
                        <button
                            class="cancel-booking-btn"
                            onclick="cancelBooking('${booking.bookingId}')"
                        >
                            ❌ Cancel Booking
                        </button>
                        `

                        :

                        `
                        <span class="cancelled-text">
                            Booking Cancelled
                        </span>
                        `
                    }

                </div>

            `;

            container.appendChild(
                card
            );

        }
    );
}


/* =====================================================
   27. CANCEL BOOKING
   ===================================================== */

function cancelBooking(bookingId) {

    if (!bookingId) {

        alert(
            "Booking ID not found."
        );

        return;
    }

    const farmer =
        getLoggedInFarmer();

    if (!farmer) {

        alert(
            "Please login first."
        );

        return;
    }

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this booking?"
        );

    if (!confirmCancel) {
        return;
    }

    let bookings =
        getMyBookings();

    const bookingIndex =
        bookings.findIndex(
            function (booking) {

                return (
                    booking.bookingId ===
                    bookingId &&

                    booking.farmerPhone ===
                    farmer.phone
                );

            }
        );

    if (bookingIndex === -1) {

        alert(
            "Booking not found."
        );

        return;
    }

    bookings.splice(
        bookingIndex,
        1
    );

    localStorage.setItem(
        "krishiBookings",
        JSON.stringify(
            bookings
        )
    );

    displayMyBookings();

    alert(
        "Booking cancelled successfully."
    );
}


/* =====================================================
   28. KRISHIFARM RESOURCE MAP
   ===================================================== */

let krishiMap = null;

let resourceMarkers = [];

let mapInitialized = false;


/* =====================================================
   INITIALIZE MAP
   ===================================================== */

function initializeResourceMap() {

    const mapContainer =
        document.getElementById("resourceMap") ||
        document.getElementById("map");

    /*
       If this page does not contain a map,
       simply do nothing.
    */

    if (!mapContainer) {
        return;
    }

    /*
       Check Leaflet
    */

    if (typeof L === "undefined") {

        console.error(
            "Leaflet library is not loaded."
        );

        return;
    }

    /*
       Prevent duplicate map initialization
    */

    if (mapInitialized) {

        /*
           Even if already initialized,
           make sure the map size is correct.
        */

        if (krishiMap) {

            setTimeout(function () {

                krishiMap.invalidateSize();

            }, 200);

        }

        return;
    }


    /* ==========================================
       CREATE MAP
       ========================================== */

    try {

        krishiMap =
            L.map(mapContainer).setView(
                [26.9124, 75.7873],
                7
            );

        mapInitialized = true;

    }

    catch (error) {

        console.error(
            "Could not initialize map:",
            error
        );

        mapInitialized = false;

        return;
    }


    /* ==========================================
       OPENSTREETMAP TILES
       ========================================== */

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(
        krishiMap
    );


    /*
       Leaflet sometimes needs the map size
       recalculated after the page has loaded.
    */

    setTimeout(function () {

        if (krishiMap) {

            krishiMap.invalidateSize();

        }

    }, 300);


    /*
       Display all resources.
    */

    displayResourcesOnMap();

}


/* =====================================================
   CLEAR MAP MARKERS
   ===================================================== */

function clearResourceMarkers() {

    if (!krishiMap) {
        return;
    }

    resourceMarkers.forEach(
        function (marker) {

            try {

                krishiMap.removeLayer(
                    marker
                );

            }

            catch (error) {

                console.error(
                    "Could not remove marker:",
                    error
                );

            }

        }
    );

    resourceMarkers = [];

}


/* =====================================================
   29. DISPLAY RESOURCES ON MAP
   ===================================================== */

async function displayResourcesOnMap() {

    if (!krishiMap) {
        return;
    }


    /*
       Make sure Leaflet knows the correct
       size of the map container.
    */

    krishiMap.invalidateSize();


    /*
       Remove old markers before adding
       the current resources.
    */

    clearResourceMarkers();


    const resources =
        getResources();


    if (
        !resources ||
        resources.length === 0
    ) {

        return;
    }


    /*
       We will collect the valid marker
       coordinates for fitting the map.
    */

    const validCoordinates = [];


    /* ==========================================
       LOOP THROUGH ALL RESOURCES
       ========================================== */

    for (
        const resource of resources
    ) {

        if (!resource) {
            continue;
        }

        if (!resource.location) {
            continue;
        }


        try {

            let coordinates = null;


            /* ==========================================
               1. USE SAVED COORDINATES FIRST
               ========================================== */

            const savedLatitude =
                Number(
                    resource.latitude
                );

            const savedLongitude =
                Number(
                    resource.longitude
                );


            if (
                resource.latitude !== null &&
                resource.latitude !== undefined &&
                resource.longitude !== null &&
                resource.longitude !== undefined &&
                Number.isFinite(savedLatitude) &&
                Number.isFinite(savedLongitude)
            ) {

                coordinates = {

                    lat:
                        savedLatitude,

                    lng:
                        savedLongitude

                };

            }


            /* ==========================================
               2. GEOCODE IF COORDINATES ARE MISSING
               ========================================== */

            if (!coordinates) {

                console.log(
                    "Finding map location for:",
                    resource.location
                );


                coordinates =
                    await geocodeResourceLocation(
                        resource.location
                    );


                /*
                   If coordinates were found,
                   save them permanently with
                   this resource.
                */

                if (coordinates) {

                    const latestResources =
                        getResources();


                    const resourceIndex =
                        latestResources.findIndex(
                            function (item) {

                                return (
                                    item.id ===
                                    resource.id
                                );

                            }
                        );


                    if (
                        resourceIndex !== -1
                    ) {

                        latestResources[
                            resourceIndex
                        ].latitude =
                            coordinates.lat;


                        latestResources[
                            resourceIndex
                        ].longitude =
                            coordinates.lng;


                        saveResources(
                            latestResources
                        );

                    }

                }

            }


            /* ==========================================
               3. LOCATION NOT FOUND
               ========================================== */

            if (!coordinates) {

                console.warn(
                    "Could not find map coordinates for:",
                    resource.location
                );

                continue;

            }


            /*
               Make sure coordinates are valid.
            */

            if (
                !Number.isFinite(
                    Number(coordinates.lat)
                ) ||
                !Number.isFinite(
                    Number(coordinates.lng)
                )
            ) {

                console.warn(
                    "Invalid coordinates for:",
                    resource.location
                );

                continue;

            }


            /* ==========================================
               EXCHANGE DETECTION
               ========================================== */

            const exchangeSelected =
                isExchangeType(
                    resource.type
                );


            /* ==========================================
               TRANSACTION INFORMATION
               ========================================== */

            let transactionText = "";


            if (exchangeSelected) {

                transactionText = `

                    <p>
                        🔄
                        <strong>
                            Exchange
                        </strong>
                    </p>

                    <p>
                        🎯
                        <strong>
                            Wants:
                        </strong>

                        ${resource.exchangeRequirement || "Not specified"}
                    </p>

                `;

            }

            else {

                transactionText = `

                    <p>
                        💰
                        <strong>
                            Price:
                        </strong>

                        ₹${resource.price}
                    </p>

                    <p>
                        🔄
                        <strong>
                            Type:
                        </strong>

                        ${resource.type}
                    </p>

                `;

            }


            /* ==========================================
               CREATE MARKER
               ========================================== */

            const marker =
                L.marker(
                    [
                        Number(coordinates.lat),
                        Number(coordinates.lng)
                    ]
                );


            /* ==========================================
               POPUP
               ========================================== */

            marker.bindPopup(`

                <div
                    class="resource-map-popup"
                    style="
                        min-width:220px;
                        max-width:300px;
                    "
                >

                    <h3>
                        ${getResourceIcon(resource.category)}
                        ${resource.name}
                    </h3>

                    <p>
                        <strong>
                            Category:
                        </strong>

                        ${resource.category}
                    </p>

                    <p>
                        ${resource.description}
                    </p>

                    <p>
                        📍
                        <strong>
                            Location:
                        </strong>

                        ${resource.location}
                    </p>

                    <p>
                        👨‍🌾
                        <strong>
                            Owner:
                        </strong>

                        ${resource.owner}
                    </p>

                    ${transactionText}

                    <button
                        onclick="openBooking('${resource.id}')"
                        style="
                            width:100%;
                            padding:8px;
                            margin-top:8px;
                            border:none;
                            border-radius:6px;
                            cursor:pointer;
                        "
                    >
                        📅 Book Resource
                    </button>

                </div>

            `);


            /* ==========================================
               ADD MARKER TO MAP
               ========================================== */

            marker.addTo(
                krishiMap
            );


            /*
               Store marker so it can be removed
               when map is refreshed.
            */

            resourceMarkers.push(
                marker
            );


            /*
               Store coordinates for auto-fit.
            */

            validCoordinates.push(
                [
                    Number(coordinates.lat),
                    Number(coordinates.lng)
                ]
            );

        }

        catch (error) {

            console.error(
                "Error displaying resource on map:",
                resource,
                error
            );

        }

    }


    /* ==========================================
       AUTO FIT MAP TO MARKERS
       ========================================== */

    if (
        validCoordinates.length > 0
    ) {

        try {

            const bounds =
                L.latLngBounds(
                    validCoordinates
                );


            krishiMap.fitBounds(
                bounds,
                {
                    padding: [30, 30],
                    maxZoom: 12
                }
            );

        }

        catch (error) {

            console.error(
                "Could not fit map bounds:",
                error
            );

        }

    }


    /*
       Final size refresh.
    */

    setTimeout(function () {

        if (krishiMap) {

            krishiMap.invalidateSize();

        }

    }, 300);

}


/* =====================================================
   30. GEOCODE RESOURCE LOCATION
   ===================================================== */

async function geocodeResourceLocation(
    location
) {

    if (!location) {
        return null;
    }


    const cleanLocation =
        String(location)
            .trim();


    if (!cleanLocation) {
        return null;
    }


    /* ==========================================
       CACHE KEY
       ========================================== */

    const cacheKey =
        "krishiGeo_" +
        cleanLocation
            .toLowerCase();


    /* ==========================================
       CHECK CACHE
       ========================================== */

    const cached =
        localStorage.getItem(
            cacheKey
        );


    if (cached) {

        try {

            const cachedCoordinates =
                JSON.parse(
                    cached
                );


            if (
                cachedCoordinates &&
                Number.isFinite(
                    Number(
                        cachedCoordinates.lat
                    )
                ) &&
                Number.isFinite(
                    Number(
                        cachedCoordinates.lng
                    )
                )
            ) {

                return {

                    lat:
                        Number(
                            cachedCoordinates.lat
                        ),

                    lng:
                        Number(
                            cachedCoordinates.lng
                        )

                };

            }

        }

        catch (error) {

            console.error(
                "Invalid cached coordinates:",
                error
            );

        }


        /*
           Remove bad cache.
        */

        localStorage.removeItem(
            cacheKey
        );

    }


    /* ==========================================
       NOMINATIM URL
       ========================================== */

    const url =
        "https://nominatim.openstreetmap.org/search" +
        "?format=json" +
        "&limit=1" +
        "&countrycodes=in" +
        "&q=" +
        encodeURIComponent(
            cleanLocation
        );


    try {

        const response =
            await fetch(
                url,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Geocoding request failed with status " +
                response.status
            );

        }


        const data =
            await response.json();


        if (
            !Array.isArray(data) ||
            data.length === 0
        ) {

            console.warn(
                "No location found for:",
                cleanLocation
            );

            return null;

        }


        const latitude =
            Number(
                data[0].lat
            );


        const longitude =
            Number(
                data[0].lon
            );


        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude)
        ) {

            return null;

        }


        const coordinates = {

            lat:
                latitude,

            lng:
                longitude

        };


        /* ==========================================
           SAVE LOCATION CACHE
           ========================================== */

        localStorage.setItem(
            cacheKey,
            JSON.stringify(
                coordinates
            )
        );


        return coordinates;

    }

    catch (error) {

        console.error(
            "Geocoding error for location:",
            cleanLocation,
            error
        );

        return null;

    }

}


/* =====================================================
   31. REFRESH MAP
   ===================================================== */

function refreshResourceMap() {

    /*
       If map does not exist yet,
       try initializing it.
    */

    if (!krishiMap) {

        initializeResourceMap();

        return;

    }


    /*
       Refresh markers.
    */

    displayResourcesOnMap();

}


/* =====================================================
   32. START MAP
   ===================================================== */

function startKrishiResourceMap() {

    /*
       Initialize immediately if DOM is already loaded.
    */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                initializeResourceMap();

            },
            {
                once: true
            }
        );

    }

    else {

        /*
           DOM is already available.
        */

        initializeResourceMap();

    }

}


/*
   Start map safely.
*/

startKrishiResourceMap();