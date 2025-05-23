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

async function BinarySearch(delay = 300) {
    var blocks = document.querySelectorAll(".block");
    var output = document.getElementById("text");
    var num = document.getElementById("fname").value;

    // Reset all blocks to the default color
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].style.backgroundColor = "#FE346E";
    }

    output.innerText = "";
    var start = 0;
    var end = blocks.length - 1; // Change to blocks.length - 1 for dynamic size
    var flag = 0;

    while (start <= end) {
        var mid = Math.floor((start + end) / 2);
        blocks[mid].style.backgroundColor = "#FF4949";
        var value = Number(blocks[mid].childNodes[0].innerHTML);

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        if (value == num) {
            output.innerText = "Element Found";
            blocks[mid].style.backgroundColor = "#13CE66";
            flag = 1;
            break;
        }

        if (value > num) {
            end = mid - 1;
            blocks[mid].style.backgroundColor = "#FFBD69";
        } else {
            start = mid + 1;
            blocks[mid].style.backgroundColor = "#FFBD69";
        }
    }

    if (flag === 0) {
        output.innerText = "Element Not Found";
    }
}

// Call generateArray to initialize the blocks
generateArray();
