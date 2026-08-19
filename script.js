let shoppingItems =
    JSON.parse(localStorage.getItem("shoppingItems")) || [];

function saveItems() {
    localStorage.setItem(
        "shoppingItems",
        JSON.stringify(shoppingItems)
    );
}

function displayItems(searchText = "") {

    const shoppingList =
        document.getElementById("shoppingList");

    shoppingList.innerHTML = "";

    // Update total number of items
    const totalItems =
        document.getElementById("totalItems");

    if (totalItems) {
        totalItems.textContent =
            "Total Items: " + shoppingItems.length;
    }

    shoppingItems.forEach((item, index) => {

        if (
            !item.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
        ) {
            return;
        }

        const li =
            document.createElement("li");

        if (item.purchased) {
            li.classList.add("purchased");
        }

        li.innerHTML = `
            <input
                type="checkbox"
                ${item.purchased ? "checked" : ""}
                onchange="markPurchased(${index})"
            >

            <span class="item-name">
                ${item.name}
            </span>

            <span>
                Quantity: ${item.quantity}
            </span>

            <button
                class="edit-btn"
                onclick="editItem(${index})">
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteItem(${index})">
                Delete
            </button>
        `;

        shoppingList.appendChild(li);
    });
}


function addItem() {

    const itemInput =
        document.getElementById("itemInput");

    const quantityInput =
        document.getElementById("quantityInput");

    const itemName =
        itemInput.value.trim();

    const quantity =
        quantityInput.value.trim();

    if (itemName === "" || quantity === "") {
        alert("Please enter an item and quantity.");
        return;
    }

    shoppingItems.push({
        name: itemName,
        quantity: quantity,
        purchased: false
    });

    saveItems();

    itemInput.value = "";
    quantityInput.value = "";

    displayItems();
}


function markPurchased(index) {

    shoppingItems[index].purchased =
        !shoppingItems[index].purchased;

    saveItems();

    displayItems();
}


function editItem(index) {

    const newName =
        prompt(
            "Enter the new item name:",
            shoppingItems[index].name
        );

    if (
        newName !== null &&
        newName.trim() !== ""
    ) {

        shoppingItems[index].name =
            newName.trim();

        saveItems();

        displayItems();
    }
}


function deleteItem(index) {

    shoppingItems.splice(index, 1);

    saveItems();

    displayItems();
}


function searchItems() {

    const searchInput =
        document.getElementById("searchInput");

    const searchText =
        searchInput.value;

    displayItems(searchText);
}


// Display saved items when the page opens
displayItems();
