
/* 
{
  "singleTunnel": {
    "trial": [
      {
        "timestamp": 1210,
        "times": 1
      },
      {
        "timestamp": 167,
        "times": 2
      },
      {
        "timestamp": 219,
        "times": 3
      },
      {
        "timestamp": 463,
        "times": 4
      },
      {
        "timestamp": 67,
        "times": 10
      }
    ],
    "performance": [
      {
        "timestamp": 44,
        "times": 5
      },
      {
        "timestamp": 42,
        "times": 6
      },
      {
        "timestamp": 28,
        "times": 7
      },
      {
        "timestamp": 52,
        "times": 8
      },
      {
        "timestamp": 37,
        "times": 9
      }
    ]
  },
  "doubleTunnel": {
    "trial": {
      "center": [
        {
          "timestamp": 0,
          "times": 11
        }
      ],
      "left": [
        {
          "timestamp": 106,
          "times": 20
        },
        {
          "timestamp": 371,
          "times": 21
        }
      ],
      "right": [
        {
          "timestamp": 0,
          "times": 12
        },
        {
          "timestamp": 0,
          "times": 13
        },
        {
          "timestamp": 0,
          "times": 14
        },
        {
          "timestamp": 101,
          "times": 22
        },
        {
          "timestamp": 119,
          "times": 23
        },
        {
          "timestamp": 123,
          "times": 24
        }
      ]
    },
    "performance": {
      "center": [],
      "left": [
        {
          "timestamp": 0,
          "times": 18
        },
        {
          "timestamp": 70,
          "times": 27
        },
        {
          "timestamp": 447,
          "times": 28
        }
      ],
      "right": [
        {
          "timestamp": 0,
          "times": 15
        },
        {
          "timestamp": 0,
          "times": 16
        },
        {
          "timestamp": 0,
          "times": 17
        },
        {
          "timestamp": 142,
          "times": 19
        },
        {
          "timestamp": 182,
          "times": 25
        },
        {
          "timestamp": 101,
          "times": 26
        },
        {
          "timestamp": 400,
          "times": 29
        }
      ]
    }
  }
}


: CSV

singleTunnel
trial
timestamp,times
1210,1
167,2
219,3
463,4
67,10
performance
timestamp,times
44,5
42,6
28,7
52,8
37,9
doubleTunnel
trial
center
timestamp,times
0,11
left
timestamp,times
106,20
371,21
right
timestamp,times
0,12
0,13
0,14
101,22
119,23
123,24
performance
center
timestamp,times
left
timestamp,times
0,18
70,27
447,28
right
timestamp,times
0,15
0,16
0,17
142,19
182,25
101,26
400,29




*/

function convertArrayObjectToCSV(jsonData) {
    let csv = "";

    // Iterate through the JSON data
    for (const tunnelType in jsonData) {
        csv += tunnelType + "\n";
        for (const trialType in jsonData[tunnelType]) {
            csv += ", " + trialType + "\n";
            if (Array.isArray(jsonData[tunnelType][trialType])) {
                csv += ", timestamp, times\n";
                for (const trial of jsonData[tunnelType][trialType]) {
                    csv += `, ${trial.timestamp}, ${trial.times}\n`;
                }
            } else {
                for (const centerType in jsonData[tunnelType][trialType]) {
                    csv += ", " + centerType + "\n";
                    csv += ", timestamp, times\n";
                    for (const center of jsonData[tunnelType][trialType][centerType]) {
                        csv += `, ${center.timestamp}, ${center.times}\n`;
                    }
                }
            }
        }
    }
    return csv;
}

// download csv
const downloadCSV = (array) => {
    const link = document.createElement('a');
    let csv = convertArrayObjectToCSV(array);
    console.log('csv', csv);
    if (csv == null) return;
    const filename = filenamefn() + '.csv';
    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
};


function filenamefn() {
    var d = new Date();
    var n = d.getTime();
    return n;
}
export {
    downloadCSV
};

