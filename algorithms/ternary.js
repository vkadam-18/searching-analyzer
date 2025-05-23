var container = document.getElementById("array");

function generateArray() {
    var arr = [];
    var blockCount = window.innerWidth <= 480 ? 20 : 20; // Use 10 blocks for mobile view

    // Generate random values for the blocks
    for (var i = 0; i < blockCount; i++) {
        var val = Number(Math.ceil(Math.random() * 100));
        arr.push(val);
    }
    arr.sort(function (a, b) {
        return a - b;
    });

    // Clear previous blocks before generating new ones
    container.innerHTML = '';

    // Calculate the width of the block based on the number of blocks
    var blockWidth = (100 / blockCount) - 1; // -1 for some spacing
    for (var i = 0; i < blockCount; i++) {
        var value = arr[i];
        var array_ele = document.createElement("div");
        array_ele.classList.add("block");
        array_ele.style.height = `${value * 3}px`;
        array_ele.style.width = `${blockWidth}%`; // Use percentage for width
        array_ele.style.left = `${i * (100 / blockCount)}%`; // Position blocks based on index
        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    }
}

async function TernarySearch(delay = 700) {
    var blocks = document.querySelectorAll(".block");
    var output = document.getElementById("text");
    var num = document.getElementById("fname").value;

    // Reset all blocks to the default color
    for (var i = 0; i < blocks.length; i += 1) {
        blocks[i].style.backgroundColor = "#FE346E";
    }

    output.innerText = "";
    var start = 0;
    var end = blocks.length - 1; // Change to blocks.length - 1 for dynamic size
    var flag = 0;

    while (start <= end) {
        var mid1 = Math.floor(start + (end - start) / 3);
        var mid2 = Math.floor(end - (end - start) / 3);
        var value1 = Number(blocks[mid1].childNodes[0].innerHTML);
        var value2 = Number(blocks[mid2].childNodes[0].innerHTML);
        blocks[mid1].style.backgroundColor = "#FFBD69";
        blocks[mid2].style.backgroundColor = "#FFBD69";
        
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        if (value1 == num) {
            output.innerText = "Element Found";
            blocks[mid1].style.backgroundColor = "#13CE66";
            flag = 1;
            break;
        }
        if (value2 == num) {
            output.innerText = "Element Found";
            blocks[mid2].style.backgroundColor = "#13CE66";
            flag = 1;
            break;
        }

        if (num < value1) {
            end = mid1 - 1;
        } else if (num > value2) {
            start = mid2 + 1;
        } else {
            start = mid1 + 1;
            end = mid2 - 1;
        }
    }

    if (flag === 0) {
        output.innerText = "Element Not Found";
    }
}

// Call generateArray to initialize the blocks
generateArray();
