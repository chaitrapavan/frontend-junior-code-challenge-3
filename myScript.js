var gridTable = document.getElementById("myTable");
document.getElementById('dwnSec').style.display = "none"; //download button should appear after the creation of grids. So styled it as display:none

//function to create grids
function drawGrid() {
    var gridWidth = document.getElementById("widthofGrid").value; //width of the grid 
    var gridHeight = document.getElementById("heightofGrid").value; //width of the grid 

    //for loop to create table rows and table cells
    for (var i = 0; i < gridWidth; i++) {
        var tableRow = document.createElement('tr');
        gridTable.appendChild(tableRow);
        for (var j = 0; j < gridHeight; j++) {
            var tableCell = document.createElement('td');
            tableRow.appendChild(tableCell);

            //function to fill in the color for table cells
            tableCell.addEventListener('click', function () {
                var myColor = document.getElementById('gridColor').value;
                this.style.backgroundColor = myColor;

                //used doudle click event to remove pixel color
                this.addEventListener('dblclick', function (e) {
                    e.target.style.backgroundColor = null;
                });
                 
                //function to remove color on the cells
                var removeColor = document.getElementById('removeColor');
                removeColor.addEventListener('click', function () {
                    clearOldGrid();
                    drawGrid();

                })

            })
        }
    }
}

//function to remove old grids
function clearOldGrid() {
    while (gridTable.firstChild) {
        gridTable.removeChild(gridTable.firstChild);
    }
}

//function to remove current grids if we want to draw new grid
function clearCurrentGrid() {
    var removeTheGrid = document.getElementById('removeGrid');
    removeTheGrid.addEventListener('click', function (e) {
        location.reload(true);
    })
}

//creation of grids should be happened after submitting height and width of the grid. This function is used to prevent the default behavior. So that we can submit the required units and get the respected table or grids
document.addEventListener('submit', function (event) {
    event.preventDefault();
    clearOldGrid(); //calling clearOldGrid function
    drawGrid(); //calling drawGrid function
    clearCurrentGrid();
    document.getElementById('dwnSec').style.display = "block"; //download button to appear after creating grids

});

// function to convert the HTML table element into image and download it
function downloadImage() {
    html2canvas(gridTable).then(function (canvas) { //html2canvas library used here
        var link = document.createElement('a');
        gridTable.appendChild(link);
        link.download = "pixel_art.png";
        link.href = canvas.toDataURL('image/png');
        link.target = '_blank';
        link.click();
    });
}