document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const pairInput = document.getElementById('pairInput');
    const addButton = document.getElementById('addButton');
    const pairList = document.getElementById('pairList');
    const sortByNameButton = document.getElementById('sortByNameButton');
    const sortByValueButton = document.getElementById('sortByValueButton');
    const deleteButton = document.getElementById('deleteButton');

    // Validation regex: Name=Value with alphanumeric only, spaces allowed around =
    const validationRegex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/;

    // Array to store name/value pairs
    let pairs = [];

    /**
     * Smart comparison function that handles alphanumeric strings
     * Numbers are compared numerically, not lexicographically
     * This ensures that "2" comes before "10" when sorting
     */
    const smartCompare = (a, b) => {
        // Split strings into parts (letters and numbers)
        const regex = /(\d+|\D+)/g;
        const aParts = a.match(regex) || [];
        const bParts = b.match(regex) || [];

        const maxLength = Math.max(aParts.length, bParts.length);

        // Compare each part
        for (let i = 0; i < maxLength; i++) {
            const aPart = aParts[i] || '';
            const bPart = bParts[i] || '';

            // Check if both parts are numbers
            const aIsNum = /^\d+$/.test(aPart);
            const bIsNum = /^\d+$/.test(bPart);

            if (aIsNum && bIsNum) {
                // Compare numerically
                const diff = parseInt(aPart) - parseInt(bPart);
                if (diff !== 0) return diff;
            } else {
                // Compare as strings (case-insensitive)
                const diff = aPart.toLowerCase().localeCompare(bPart.toLowerCase());
                if (diff !== 0) return diff;
            }
        }

        return 0;
    };

    /**
     * Renders the list of pairs to the select element
     */
    const renderList = () => {
        // Clear existing options
        pairList.innerHTML = '';

        // Create option for each pair
        pairs.forEach((pair, index) => {
            const option = document.createElement('option');
            option.value = index; // Use index as unique identifier
            option.textContent = `${pair.name}=${pair.value}`;
            pairList.appendChild(option);
        });
    };

    /**
     * Adds a new name/value pair to the list
     * Validates input format before adding
     */
    const addPair = () => {
        const input = pairInput.value.trim();
        const match = input.match(validationRegex);

        if (match) {
            // Extract name and value from regex match
            const name = match[1];
            const value = match[2];

            // Add pair to array
            pairs.push({ name, value });

            // Re-render the list
            renderList();

            // Clear input field
            pairInput.value = '';
        } else {
            // Show error message for invalid format
            alert('Invalid format. Please use "Name=Value" with only alphanumeric characters.');
        }
    };

    // Event: Add button click
    addButton.addEventListener('click', addPair);

    // Event: Enter key in input field
    pairInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addPair();
        }
    });

    // Event: Sort by name (ascending, with smart numeric sorting)
    sortByNameButton.addEventListener('click', () => {
        pairs.sort((a, b) => smartCompare(a.name, b.name));
        renderList();
    });

    // Event: Sort by value (ascending, with smart numeric sorting)
    sortByValueButton.addEventListener('click', () => {
        pairs.sort((a, b) => smartCompare(a.value, b.value));
        renderList();
    });

    // Event: Delete selected items
    deleteButton.addEventListener('click', () => {
        // Get indices of selected options
        const selectedIndices = Array.from(pairList.selectedOptions).map(option => parseInt(option.value));

        // Filter out selected pairs by index
        pairs = pairs.filter((_, index) => !selectedIndices.includes(index));

        // Re-render the list
        renderList();
    });
});