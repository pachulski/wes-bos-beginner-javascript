const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

let items = []; // An array for holding a state

function handleSubmit(e) {
    e.preventDefault();
    const name = e.currentTarget.item.value;
    if (!name) return; // If it's empty don't submit it
    const item = {
        name,
        id: Date.now(),
        complete: false,
    };

    items.push(item); // Push the item into our state

    e.target.reset(); // Clear the form

    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
    const html = items.map(item => `<li class="shopping-item">
    <input value="${item.id}" type="checkbox" ${item.complete ? 'checked' : ''}>
    <span class="itemName">${item.name}</span>
    <button aria-label="Remove ${item.name}" value="${item.id}">&times;</button>
    </li>`).join('');
    list.innerHTML = html;
}

function mirrorToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
    const lsItems = JSON.parse(localStorage.getItem('items'));
    if (lsItems.length) {
        items.push(...lsItems);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}

function deleteItem(id) {
    items = items.filter(item => item.id !== id);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
    const itemRef = items.find(item => item.id === id);
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// Event Delegation: We listen for the click on the list <ul> but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', function(e) {
    const id = parseInt(e.target.value);
    if (e.target.matches('button')) {
        deleteItem(id);
    }
    if (e.target.matches('input[type="checkbox"]')) {
        markAsComplete(id);
    }
});

restoreFromLocalStorage();