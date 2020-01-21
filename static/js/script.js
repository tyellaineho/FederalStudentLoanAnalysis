// *********************************************************************************************
// FEDERAL STUDENT LOANS: THE DECADE IN REVIEW 2010-2019
// CREATED BY ELLAINE TSZ YING HO
// Columbia University Data Analytics Bootcamp
// Javascript functions to build graphs and dashboard for student loan data.
// *********************************************************************************************

// *********************************************************************************************
// This function builds the total school count bar chart. Additionally, it also builds a proportional chart for percentage of schools vs total.
// *********************************************************************************************
function buildSchoolCountBarChart() {

    const schoolCountUrl = `/annualdata/all/schoolcount`

    d3.json(schoolCountUrl).then(function (data) {

        const BAR = document.getElementById("schoolCountBarChart");

        const schoolCountData = [
            {
                x: ["2010-2011", "2011-2012", "2012-2013", "2013-2014", "2014-2015", "2015-2016", "2016-2017", "2017-2018", "2018-2019"],
                y: data.map(a => a.school_count),
                type: 'bar',
                name: 'School Count by Year',
                marker: { color: ['#c04ba5', '#a45cb2', '#8868b6', '#6a78b4', '#677fb4', '#6786b3', '#6f92be', '#80abd5', '#89b7e0'] },
                text: data.map(a => a.school_count),
                textposition: 'auto',
            }
        ];

        const schoolCountBarLayout = {
            title: `Total School Participation from 2010-2019`,
            xaxis: { title: `Year` },
            yaxis: {
                title: `Number of Schools`,
                range: [5000, 5800]
            },
            font: { family: 'Quicksand, sans-serif' }
        };

        Plotly.newPlot(BAR, schoolCountData, schoolCountBarLayout, { responsive: true });

        const BAR2 = document.getElementById("schoolPercBarChart");
        const yearArray = ["2010-2011", "2011-2012", "2012-2013", "2013-2014", "2014-2015", "2015-2016", "2016-2017", "2017-2018", "2018-2019"]

        const pubPercBar = {
            x: data.map(a => a.public_pct),
            y: yearArray,
            name: 'Public',
            orientation: 'h',
            marker: { color: '#3C1642' },
            type: 'bar',
            opacity: 0.75
        };

        const prvPercBar = {
            x: data.map(a => a.private_pct),
            y: yearArray,
            name: 'Private',
            orientation: 'h',
            marker: { color: '#086375' },
            type: 'bar',
            opacity: 0.75
        };

        const propPercBar = {
            x: data.map(a => a.proprietary_pct),
            y: yearArray,
            name: 'Proprietary',
            orientation: 'h',
            marker: { color: '#1DD3B0' },
            type: 'bar',
            opacity: 0.75
        };

        const forPubPercBar = {
            x: data.map(a => a.forpub_pct),
            y: yearArray,
            name: 'For. Public',
            orientation: 'h',
            marker: { color: '#AFFC41' },
            type: 'bar',
            opacity: 0.75
        };

        const forPrvPercBar = {
            x: data.map(a => a.forprv_pct),
            y: yearArray,
            name: 'For. Private',
            orientation: 'h',
            marker: { color: '#F9FC5A' },
            type: 'bar',
            opacity: 0.75
        };

        const forPropPercBar = {
            x: data.map(a => a.forprop_pct),
            y: yearArray,
            name: 'For. Proprietary',
            orientation: 'h',
            marker: { color: '#C13CB4' },
            type: 'bar',
            opacity: 0.75
        };

        const percBarData = [pubPercBar, prvPercBar, propPercBar, forPubPercBar, forPrvPercBar, forPropPercBar];

        const percBarLayout = {
            title: { text: `Proportion of School Participation by Year`, size: 18 },
            barmode: 'stack',
            yaxis: {
                margin: 'auto',
                title: `Year`,
                zeroline: false,
            },
            xaxis: { title: 'Percentage' },
            font: { family: 'Quicksand, sans-serif' }
        };

        Plotly.newPlot(BAR2, percBarData, percBarLayout, { responsive: true });

    });
};

// *********************************************************************************************
// This function builds the school count line graph by school type.
// *********************************************************************************************
function buildLineGraph(schooltype) {

    const schoolCountUrl = `/annualdata/all/schoolcount`
    d3.json(schoolCountUrl).then(function (data) {

        const LINE = document.getElementById("line-graph");

        const yearArray = ["2010-2011", "2011-2012", "2012-2013", "2013-2014", "2014-2015", "2015-2016", "2016-2017", "2017-2018", "2018-2019"]

        const selectedType = schooltype;

        switch (selectedType) {
            case 'Public':
                var schoolCountLineTrace = {
                    x: yearArray,
                    y: data.map(a => a.public),
                    type: 'line',
                    line: {
                        color: '#3C1642',
                        width: 5,
                        opacity: 0.75
                    },
                    marker: {
                        symbol: 17,
                        color: '#3C1642',
                        size: 20,
                        opacity: 0.75
                    },
                };
                break;
            case 'Private':
                var schoolCountLineTrace = {
                    x: yearArray,
                    y: data.map(a => a.private),
                    type: 'line',
                    line: {
                        color: '#086375',
                        width: 5,
                        opacity: 0.75
                    },
                    marker: {
                        symbol: 17,
                        color: '#086375',
                        size: 20,
                        opacity: 0.75
                    },
                };
                break;
            case 'Proprietary':
                var schoolCountLineTrace = {
                    x: yearArray,
                    y: data.map(a => a.proprietary),
                    type: 'line',
                    line: {
                        color: '#1DD3B0',
                        width: 5,
                        opacity: 0.75
                    },
                    marker: {
                        symbol: 17,
                        color: '#1DD3B0',
                        size: 20,
                        opacity: 0.75
                    },
                };
                break;
            case 'Foreign Public':
                var schoolCountLineTrace = {
                    x: yearArray,
                    y: data.map(a => a.foreign_public),
                    type: 'line',
                    line: {
                        color: '#AFFC41',
                        width: 5,
                        opacity: 0.75
                    },
                    marker: {
                        symbol: 17,
                        color: '#AFFC41',
                        size: 20,
                        opacity: 0.75
                    },
                };
                break;
            case 'Foreign Private':
                var schoolCountLineTrace = {
                    x: yearArray,
                    y: data.map(a => a.foreign_private),
                    type: 'line',
                    line: {
                        color: '#B2FF9E',
                        width: 5,
                        opacity: 0.75
                    },
                    marker: {
                        symbol: 17,
                        color: '#B2FF9E',
                        size: 20,
                        opacity: 0.75
                    },
                };
                break;
            case 'Foreign Proprietary':
                var schoolCountLineTrace = {
                    x: yearArray,
                    y: data.map(a => a.foreign_profit),
                    type: 'line',
                    line: {
                        color: '#F9FC5A',
                        width: 5,
                        opacity: 0.75
                    },
                    marker: {
                        symbol: 17,
                        color: '#F9FC5A',
                        size: 20,
                        opacity: 0.75
                    },
                };
                break;
        };

        const schoolCountLineGraphLayout = {
            title: { text: `Participation by School Type: ${selectedType} Schools`, size: 18 },
            yaxis: {
                title: `Count of Schools`,
            },
            xaxis: {
                title: 'Year',
                showgrid: false
            },
            font: { family: 'Quicksand, sans-serif' }
        };
        const schoolCountLineData = [schoolCountLineTrace]

        Plotly.newPlot(LINE, schoolCountLineData, schoolCountLineGraphLayout, { responsive: true });
    });
};

// *********************************************************************************************
// This function builds a bubble graph that looks at total disb data and average debt in year 10-11.
// An additional function will be called to update the graph interactively to review data from 2010-2019.
// *********************************************************************************************
function buildBubble() {

    const recipDisbUrl1011 = "/annualdata/all/recipients_disbursements/1011"

    d3.json(recipDisbUrl1011).then(function (data) {

        const BUBBLE = document.getElementById("bubble-graph");

        var dlsbBubble = {
            x: data.map(a => a.total_dlsb_sum),
            y: data.map(a => a.avgdebt_dlsb),
            name: 'Dir Sub',
            mode: 'markers',
            marker: {
                color: '#3C1642',
                size: data.map(a => a.total_dlsb_recip) / 100000
            },
            opacity: 0.75
        };

        var ugdlusBubble = {
            x: data.map(a => a.total_ugdlus_sum),
            y: data.map(a => a.avgdebt_ugdlus),
            name: 'Dir Unsub',
            mode: 'markers',
            marker: {
                color: '#086375',
                size: data.map(a => a.total_ugdlus_recip) / 100000
            },
            opacity: 0.75
        };

        var grdlusBubble = {
            x: data.map(a => a.total_grdlus_sum),
            y: data.map(a => a.avgdebt_grdlus),
            name: 'Gr Unsub',
            mode: 'markers',
            marker: {
                color: '#1DD3B0',
                size: data.map(a => a.total_grdlus_recip) / 100000
            },
            opacity: 0.75
        };

        var prplusBubble = {
            x: data.map(a => a.total_prplus_sum),
            y: data.map(a => a.avgdebt_prplus),
            name: 'Pr Plus',
            mode: 'markers',
            marker: {
                color: '#AFFC41',
                size: data.map(a => a.total_prplus_recip) / 100000
            },
            opacity: 0.75
        };

        var grplusBubble = {
            x: data.map(a => a.total_grplus_sum),
            y: data.map(a => a.avgdebt_grplus),
            name: 'Gr Plus',
            mode: 'markers',
            marker: {
                color: '#002B2B',
                size: data.map(a => a.total_grplus_recip) / 100000
            },
            opacity: 0.75
        };

        var grdlsbBubble = {
            x: data.map(a => a.total_grdlsb_sum),
            y: data.map(a => a.avgdebt_grdlsb),
            name: 'Gr Unsub',
            mode: 'markers',
            marker: {
                color: '#F9FC5A',
                size: data.map(a => a.total_grdlsb_recip) / 100000
            },
            opacity: 0.75
        };

        const loanData = [dlsbBubble, ugdlusBubble, grdlusBubble, prplusBubble, grplusBubble, grdlsbBubble]

        const bubbleLayout = {
            title: { text: `Loan Recipient Data over the Years`, size: 18 },
            xaxis: {
                title: "Dollars Disbursed<br>Note: Size of bubble denotes number of recipients.",
                range: [5000000000, 35000000000]
            },
            yaxis: {
                title: "Average Debt in Dollars",
                range: [0, 25000]
            },
            font: { family: 'Quicksand, sans-serif' }
        };

        Plotly.newPlot(BUBBLE, loanData, bubbleLayout, { responsive: true });
    })

}

// *********************************************************************************************
// This function updates the bubble graph in animation format when the user clicks a year update button, and a change function is called upon.
// *********************************************************************************************
function updateBubble(selectedYear) {

    const recipDisbYearUrl = `/annualdata/all/recipients_disbursements/${selectedYear}`

    d3.json(recipDisbYearUrl).then(function (data) {

        const BUBBLE = document.getElementById("bubble-graph");

        // Create variables in var format since the data can change depending on the year.
        var avgDlsb = data.map(a => a.avgdebt_dlsb)
        var avgUgdlus = data.map(a => a.avgdebt_ugdlus)
        var avgGrdlus = data.map(a => a.avgdebt_grdlus)
        var avgPrplus = data.map(a => a.avgdebt_prplus)
        var avgGrplus = data.map(a => a.avgdebt_grplus)
        var avgGrdlsb = data.map(a => a.avgdebt_grdlsb)

        var dlsbSum = data.map(a => a.total_dlsb_sum)
        var ugdlusSum = data.map(a => a.total_ugdlus_sum)
        var grdlusSum = data.map(a => a.total_grdlus_sum)
        var prplusSum = data.map(a => a.total_prplus_sum)
        var grplusSum = data.map(a => a.total_grplus_sum)
        var grdlsbSum = data.map(a => a.total_grdlsb_sum)

        Plotly.animate(BUBBLE,
            {
                data: [{
                    y: avgDlsb,
                    x: dlsbSum,
                    marker: { size: data.map(a => a.total_dlsb_recip) / 100000 },
                }],
                traces: [0],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })

        Plotly.animate(BUBBLE,
            {
                data: [{
                    y: avgUgdlus,
                    x: ugdlusSum,
                    marker: { size: data.map(a => a.total_ugdlus_recip) / 100000 },
                }],
                traces: [1],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })

        Plotly.animate(BUBBLE,
            {
                data: [{
                    y: avgGrdlus,
                    x: grdlusSum,
                    marker: { size: data.map(a => a.total_grdlus_recip) / 100000 },
                }],
                traces: [2],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })

        Plotly.animate(BUBBLE,
            {
                data: [{
                    y: avgPrplus,
                    x: prplusSum,
                    marker: { size: data.map(a => a.total_prplus_recip) / 100000 },
                }],
                traces: [3],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })

        Plotly.animate(BUBBLE,
            {
                data: [{
                    y: avgGrplus,
                    x: grplusSum,
                    marker: { size: data.map(a => a.total_grplus_recip) / 100000 },
                }],
                traces: [4],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })

        Plotly.animate(BUBBLE,
            {
                data: [{
                    y: avgGrdlsb,
                    x: grdlsbSum,
                    marker: { size: data.map(a => a.total_grdlsb_recip) / 100000 },
                }],
                traces: [5],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })
    })
}

// *********************************************************************************************
// This function builds a school specific graph on the initial dropdown execution.
// An additional function will be called to update the graph interactively to review data for other schools. The graphs in this function include a bar graph, as well as a line graph.
// *********************************************************************************************
function buildSchoolSpecificChart(selectedSchool) {
    const selectedSchoolUrl = `/usfedloandata/school/${selectedSchool}`

    d3.json(selectedSchoolUrl).then(function (data) {

        const BAR3 = document.getElementById('school-bar-chart')
        var selSchoolName = data.map(a => a.school_name_org).slice(0, 1)

        const yearArray = ["2010-2011", "2011-2012", "2012-2013", "2013-2014", "2014-2015", "2015-2016", "2016-2017", "2017-2018", "2018-2019"]

        // Y trace variable for total disb sum
        var sumSelSchoolDlsb = data.map(a => a.sum_dlsb_disb)

        //build a bar chart depending on the first type of loan. it may be 0 if the school doesn't have the data
        var selSchoolDisbData = [
            {
                x: yearArray,
                y: data.map(a => a.sum_dlsb_disb).reverse(),
                type: 'bar',
                name: 'Disbursement Data by Year',
                marker: { color: ['#c04ba5', '#a45cb2', '#8868b6', '#6a78b4', '#677fb4', '#6786b3', '#6f92be', '#80abd5', '#89b7e0'] },
                text: data.map(a => a.sum_dlsb_disb).reverse(),
                textposition: 'auto',
            }
        ];

        var selSchoolDisbBarLayout = {
            title: `Direct Subsidized Loan Disbursements<br>${selSchoolName}`,
            xaxis: { title: `Year` },
            yaxis: {
                title: `Dollars`,
            },
            font: { family: 'Quicksand, sans-serif' }
        };

        const LINE2 = document.getElementById("school-line-graph")

        var selSchoolAvgData = [{
            x: yearArray,
            y: data.map(a => a.avg_school_dlsb).reverse(),
            type: 'line',
            line: {
                color: '#5B0046',
                width: 3,
                opacity: .7
            },
            marker: {
                color: '#5B0046',
                size: 5,
                opacity: .7
            },
        }]

        const selSchoolAvgLayout = {
            title: { text: `Direct Subsidized Loan Average<br>${selSchoolName}` },
            yaxis: {
                title: `Dollars per Recipient`,
            },
            xaxis: {
                title: 'Year',
                showgrid: false
            },
            font: { family: 'Quicksand, sans-serif' }
        };

        Plotly.newPlot(LINE2, selSchoolAvgData, selSchoolAvgLayout, { responsive: true });
        Plotly.newPlot(BAR3, selSchoolDisbData, selSchoolDisbBarLayout, { responsive: true });

    })
}

// *********************************************************************************************
// This function updates the school specific graph in subsequent downdown execution. Additionally, it updates charts based on the loan type button execution. Both are in animated format. We utilize a switch/case statement in this function.
// *********************************************************************************************
function updateSchoolSpecificChart(selSchoolLoanType, loantype) {

    const updatedSchoolUrl = `/usfedloandata/school/${selSchoolLoanType}`
    d3.json(updatedSchoolUrl).then(function (data) {

        const BAR3 = document.getElementById("school-bar-chart");
        const LINE2 = document.getElementById("school-line-graph")
        var selSchoolName = data.map(a => a.school_name_org).slice(0, 1)

        const yearArray = ["2010-2011", "2011-2012", "2012-2013", "2013-2014", "2014-2015", "2015-2016", "2016-2017", "2017-2018", "2018-2019"]

        switch (loantype) {
            case 'Direct Subsidized':
                // Bar Chart Update
                var yrange = Math.max(...data.map(a => a.sum_dlsb_disb)) + 200
                Plotly.animate(BAR3,
                    {
                        data: [{
                            y: data.map(a => a.sum_dlsb_disb).reverse(),
                            x: yearArray,
                            text: data.map(a => a.sum_dlsb_disb).reverse()
                        }],
                        traces: [0],
                        layout: {
                            title: `Direct Subsidized Loan Disbursements<br>${selSchoolName}`,
                            yaxis: { range: [0, yrange] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },
                    frame: {
                        duration: 500
                    }
                })
                //Line Graph Update
                var yavgMax = Math.max(...data.map(a => a.avg_school_dlsb)) + 75
                var yavgMin = Math.min(...data.map(a => a.avg_school_dlsb))
                Plotly.animate(LINE2,
                    {
                        data: [{
                            y: data.map(a => a.avg_school_dlsb).reverse(),
                        }],
                        traces: [0],
                        layout: {
                            title: `Direct Subsidized Loan Average<br>${selSchoolName}`,
                            yaxis: { range: [yavgMin, yavgMax] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },

                    frame: {
                        duration: 500
                    }
                })
                break;

            case 'Direct Unsubsidized':
                // Bar Chart Update
                var yrange = Math.max(...data.map(a => a.sum_ugdlus_disb)) + 200
                Plotly.animate(BAR3,
                    {
                        data: [{
                            y: data.map(a => a.sum_ugdlus_disb).reverse(),
                            x: yearArray,
                            text: data.map(a => a.sum_ugdlus_disb).reverse()
                        }],
                        traces: [0],
                        layout: {
                            title: `Direct Unsubsidized Loan Disbursements<br>${selSchoolName}`,
                            yaxis: { range: [0, yrange] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },
                    frame: {
                        duration: 500
                    }
                })
                //Line Graph Update
                var yavgMax = Math.max(...data.map(a => a.avg_school_ugdlus)) + 75
                var yavgMin = Math.min(...data.map(a => a.avg_school_ugdlus))
                Plotly.animate(LINE2,
                    {
                        data: [{
                            y: data.map(a => a.avg_school_ugdlus).reverse(),
                        }],
                        traces: [0],
                        layout: {
                            title: `Direct Unsubsidized Loan Average<br>${selSchoolName}`,
                            yaxis: { range: [yavgMin, yavgMax] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },

                    frame: {
                        duration: 500
                    }
                })
                break;

            case 'Graduate Unsubsidized':
                // Bar Chart Update
                var yrange = Math.max(...data.map(a => a.sum_grdlus_disb)) + 200
                Plotly.animate(BAR3,
                    {
                        data: [{
                            y: data.map(a => a.sum_grdlus_disb).reverse(),
                            x: yearArray,
                            text: data.map(a => a.sum_grdlus_disb).reverse()
                        }],
                        traces: [0],
                        layout: {
                            title: `Graduate Unsubsidized Loan Disbursements<br>${selSchoolName}`,
                            yaxis: { range: [0, yrange] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },
                    frame: {
                        duration: 500
                    }
                })
                //Line Graph Update
                var yavgMax = Math.max(...data.map(a => a.avg_school_grdlus)) + 75
                var yavgMin = Math.min(...data.map(a => a.avg_school_grdlus))
                Plotly.animate(LINE2,
                    {
                        data: [{
                            y: data.map(a => a.avg_school_grdlus).reverse(),
                        }],
                        traces: [0],
                        layout: {
                            title: `Graduate Unsubsidized Loan Average<br>${selSchoolName}`,
                            yaxis: { range: [yavgMin, yavgMax] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },

                    frame: {
                        duration: 500
                    }
                })
                break;

            case 'Parent PLUS':
                // Bar Chart Update
                var yrange = Math.max(...data.map(a => a.sum_prplus_disb)) + 200
                Plotly.animate(BAR3,
                    {
                        data: [{
                            y: data.map(a => a.sum_prplus_disb).reverse(),
                            x: yearArray,
                            text: data.map(a => a.sum_prplus_disb).reverse()
                        }],
                        traces: [0],
                        layout: {
                            title: `Parent PLUS Loan Disbursements<br>${selSchoolName}`,
                            yaxis: { range: [0, yrange] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },
                    frame: {
                        duration: 500
                    }
                })
                //Line Graph Update
                var yavgMax = Math.max(...data.map(a => a.avg_school_prplus)) + 75
                var yavgMin = Math.min(...data.map(a => a.avg_school_prplus))
                Plotly.animate(LINE2,
                    {
                        data: [{
                            y: data.map(a => a.avg_school_prplus).reverse(),
                        }],
                        traces: [0],
                        layout: {
                            title: `Parent PLUS Loan Average<br>${selSchoolName}`,
                            yaxis: { range: [yavgMin, yavgMax] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },

                    frame: {
                        duration: 500
                    }
                })
                break;

            case 'Graduate PLUS':
                // Bar Chart Update
                var yrange = Math.max(...data.map(a => a.sum_grplus_disb)) + 200
                console.log(data.map(a => a.sum_grplus_disb))
                Plotly.animate(BAR3,
                    {
                        data: [{
                            y: data.map(a => a.sum_grplus_disb).reverse(),
                            x: yearArray,
                            text: data.map(a => a.sum_grplus_disb).reverse()
                        }],
                        traces: [0],
                        layout: {
                            title: `Graduate PLUS Loan Disbursements<br>${selSchoolName}`,
                            yaxis: { range: [0, yrange] }}
                        },
                         {
                        transition: {
                            duration: 500,
                            easing: 'cubic-in-out'
                        },
                        frame: {
                            duration: 500
                        }
                    })
                //Line Graph Update
                var yavgMax = Math.max(...data.map(a => a.avg_school_grplus)) + 75
                var yavgMin = Math.min(...data.map(a => a.avg_school_grplus))
                Plotly.animate(LINE2,
                    {
                        data: [{
                            y: data.map(a => a.avg_school_grplus).reverse(),
                        }],
                        traces: [0],
                        layout: {
                            title: `Graduate PLUS Loan Average<br>${selSchoolName}`,
                            yaxis: { range: [yavgMin, yavgMax] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },

                    frame: {
                        duration: 500
                    }
                })
                break;

            case 'Graduate Subsidized':
                // Bar Chart Update
                var yrange = Math.max(...data.map(a => a.sum_grdlsb_disb)) + 200
                Plotly.animate(BAR3,
                    {
                        data: [{
                            y: data.map(a => a.sum_grdlsb_disb).reverse(),
                            x: yearArray,
                            text: data.map(a => a.sum_grdlsb_disb).reverse()
                        }],
                        traces: [0],
                        layout: {
                            title: `Graduate Subsidized Loan Disbursements<br>${selSchoolName}`,
                            yaxis: { range: [0, yrange] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },

                    frame: {
                        duration: 500
                    }
                })
                //Line Graph Update
                var yavgMax = Math.max(...data.map(a => a.avg_school_grdlsb)) + 75
                var yavgMin = Math.min(...data.map(a => a.avg_school_grdlsb))
                Plotly.animate(LINE2,
                    {
                        data: [{
                            y: data.map(a => a.avg_school_grdlsb).reverse(),
                        }],
                        traces: [0],
                        layout: {
                            title: `Graduate Subsidized Loan Average<br>${selSchoolName}`,
                            yaxis: { range: [yavgMin, yavgMax] }
                        },
                    }, {
                    transition: {
                        duration: 500,
                        easing: 'cubic-in-out'
                    },

                    frame: {
                        duration: 500
                    }
                })
                break;
        };
    });
};

// *********************************************************************************************
// This function builds a school specific dot graph on the initial dropdown execution.
// An additional function will be called to update the graph interactively to review data for other schools.
// *********************************************************************************************
function buildSchoolSpecificDotChart(selectedSchool) {

    const selectedSchoolUrl = `/usfedloandata/school/${selectedSchool}`

    d3.json(selectedSchoolUrl).then(function (data) {

        const DOTPLOT = document.getElementById("dot-plot")
        const selSchoolName = data.map(a => a.school_name_org).slice(0, 1)

        const yearArrayReverse = ["2018-2019", "2017-2018", "2016-2017", "2015-2016", "2014-2015", "2013-2014", "2012-2013", "2011-2012", "2010-2011"]


        // X traces variables recipient
        const recSelSchoolDlsb = data.map(a => a.dlsb_recip)
        const recSelSchoolUgdlus = data.map(a => a.ugdlus_recip)
        const recSelSchoolGrdlus = data.map(a => a.grdlus_recip)
        const recSelSchoolPrplus = data.map(a => a.prplus_recip)
        const recSelSchoolGrplus = data.map(a => a.grplus_recip)
        const recSelSchoolGrdlsb = data.map(a => a.grdlsb_recip)


        const dotTrace1 = {
            type: 'scatter',
            x: recSelSchoolDlsb,
            y: yearArrayReverse,
            mode: 'markers',
            name: 'Dir. Sub',
            marker: {
                color: '#3C1642',
                opacity: 0.75,
                line: {
                    color: '#3C1642',
                    width: 1,
                },
                symbol: 'circle',
                size: 16
            }
        };

        const dotTrace2 = {
            x: recSelSchoolUgdlus,
            y: yearArrayReverse,
            mode: 'markers',
            name: 'Dir. Unsub',
            marker: {
                color: '#086375',
                opacity: 0.75,
                line: {
                    color: '#086375',
                    width: 1,
                },
                symbol: 'circle',
                size: 16
            }
        };

        const dotTrace3 = {
            x: recSelSchoolGrdlus,
            y: yearArrayReverse,
            mode: 'markers',
            name: 'Gr. Unsub',
            marker: {
                color: '#1DD3B0',
                opacity: 0.75,
                line: {
                    color: '#1DD3B0',
                    width: 1,
                },
                symbol: 'circle',
                size: 16
            }
        };

        const dotTrace4 = {
            x: recSelSchoolPrplus,
            y: yearArrayReverse,
            mode: 'markers',
            name: 'Pr. PLUS',
            marker: {
                color: '#AFFC41',
                opacity: 0.75,
                line: {
                    color: '#AFFC41',
                    width: 1,
                },
                symbol: 'circle',
                size: 16
            }
        };

        const dotTrace5 = {
            x: recSelSchoolGrplus,
            y: yearArrayReverse,
            mode: 'markers',
            name: 'Gr. PLUS',
            marker: {
                color: '#B2FF9E',
                opacity: 0.75,
                line: {
                    color: '#B2FF9E',
                    width: 1,
                },
                symbol: 'circle',
                size: 16
            }
        };

        const dotTrace6 = {
            x: recSelSchoolGrdlsb,
            y: yearArrayReverse,
            mode: 'markers',
            name: 'Gr. Sub',
            marker: {
                color: '#F9FC5A',
                opacity: 0.75,
                line: {
                    color: '#F9FC5A',
                    width: 1,
                },
                symbol: 'circle',
                size: 16
            }
        };

        const dotData = [dotTrace1, dotTrace2, dotTrace3, dotTrace4, dotTrace5, dotTrace6];

        const dotLayout = {
            title: `${selSchoolName} Loan Recipient Data`,
            font: { family: 'Quicksand, sans-serif' },
            xaxis: {
                title: 'Number of Recipients',
                showgrid: false,
                showline: true,
                zeroline: false,
                ticks: 'outside',
            },
            yaxis: {
                title: 'Year'
            },
            margin: {
                l: 140,
                r: 100,
                b: 50,
                t: 80
            },
            hovermode: 'closest'
        };

        Plotly.newPlot(DOTPLOT, dotData, dotLayout, { responsive: true });

    })
}

// *********************************************************************************************
// This function updates the school specific dot graph in subsequent downdown execution in animated format.
// *********************************************************************************************
function updateSchoolSpecificDotChart(newSchool) {

    const newSchoolUrl = `/usfedloandata/school/${newSchool}`

    d3.json(newSchoolUrl).then(function (data) {

        const DOTPLOT = document.getElementById("dot-plot")
        const selSchoolName = data.map(a => a.school_name_org).slice(0, 1)

        const yearArrayReverse = ["2018-2019", "2017-2018", "2016-2017", "2015-2016", "2014-2015", "2013-2014", "2012-2013", "2011-2012", "2010-2011"]

        // X traces variables avg debt
        const avgSelSchoolDlsb = data.map(a => a.avg_school_dlsb)
        const avgSelSchoolUgdlus = data.map(a => a.avg_school_ugdlus)
        const avgSelSchoolGrdlus = data.map(a => a.avg_school_grdlus)
        const avgSelSchoolPrplus = data.map(a => a.avg_school_prplus)
        const avgSelSchoolGrplus = data.map(a => a.avg_school_grplus)
        const avgSelSchoolGrdlsb = data.map(a => a.avg_school_grdlsb)

        // X traces variables recipient
        const recSelSchoolDlsb = data.map(a => a.dlsb_recip)
        const recSelSchoolUgdlus = data.map(a => a.ugdlus_recip)
        const recSelSchoolGrdlus = data.map(a => a.grdlus_recip)
        const recSelSchoolPrplus = data.map(a => a.prplus_recip)
        const recSelSchoolGrplus = data.map(a => a.grplus_recip)
        const recSelSchoolGrdlsb = data.map(a => a.grdlsb_recip)

        Plotly.animate(DOTPLOT,
            {
                layout: { title: `${selSchoolName} Loan Recipient Data` },
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })

        Plotly.animate(DOTPLOT,
            {
                data: [{
                    y: yearArrayReverse,
                    x: recSelSchoolDlsb
                }],
                traces: [0],
                layout: {},
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },

            frame: {
                duration: 500
            }
        })

        Plotly.animate(DOTPLOT,
            {
                data: [{
                    y: yearArrayReverse,
                    x: recSelSchoolUgdlus
                }],
                traces: [1],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })

        Plotly.animate(DOTPLOT,
            {
                data: [{
                    y: yearArrayReverse,
                    x: recSelSchoolGrdlus
                }],
                traces: [2],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })


        Plotly.animate(DOTPLOT,
            {
                data: [{
                    y: yearArrayReverse,
                    x: recSelSchoolPrplus
                }],
                traces: [3],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })

        Plotly.animate(DOTPLOT,
            {
                data: [{
                    y: yearArrayReverse,
                    x: recSelSchoolGrplus
                }],
                traces: [4],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })

        Plotly.animate(DOTPLOT,
            {
                data: [{
                    y: yearArrayReverse,
                    x: recSelSchoolGrdlsb
                }],
                traces: [5],
                layout: {}
            }, {
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            },
            frame: {
                duration: 500
            }
        })
    })
}

// *********************************************************************************************
// This function fetches the new school type from the dropdown execution for school type vs counts. Then, it will execute a function to build a line graph based on the new school type.
// *********************************************************************************************
function lineOptionChanged(newschooltype) {
    buildLineGraph(newschooltype);
};

// *********************************************************************************************
// This function fetches the new school name from the dropdown execution for school names. Then, it will execute functions to build a dot graph and the two school specific bar/line charts based on the new school name.
// *********************************************************************************************
function schoolOptionChanged(newSchool) {
    updateSchoolSpecificDotChart(newSchool);
    buildSchoolSpecificChart(newSchool);
}

// *********************************************************************************************
// This function fetches the new school name and loan type from the dropdown execution for school names. Then, it will execute functions to update the two school specific bar/line charts based on the new school name/loan type.
// *********************************************************************************************
function loanTypeOptionChanged(loantype) {
    selSchoolLoanType = document.querySelector('#select_school').value;
    updateSchoolSpecificChart(selSchoolLoanType, loantype)
}

// *********************************************************************************************
// This is the initializer function to build all initial graphs on the dashboard.
// *********************************************************************************************
function init() {
    buildSchoolCountBarChart();
    buildBubble();

    var lineSelector = d3.select("#selLineSchoolCount");
    arrOfSchools = ["Public", "Private", "Proprietary", "Foreign Public", "Foreign Private", "Foreign Proprietary"]

    arrOfSchools.forEach((schooltype) => {
        lineSelector
            .append("option")
            .text(schooltype)
            .property("value", schooltype);

    });

    const firstSchoolType = arrOfSchools[0]
    buildLineGraph(firstSchoolType);

    firstSchoolUrl = `/usfedloandata/all`
    d3.json(firstSchoolUrl).then(function (data) {

        const selectSchoolSelector = d3.select("#select_school");

        arrOfSchools = [];
        arrOfDups = [];
        arrOfSchools.push(data[0].ope_school_identifier);

        for (i = 1; i < data.length; i++) {
            if (data[i].ope_school_identifier === data[i - 1].ope_school_identifier) {
                arrOfDups.push(data[i.ope_school_identifier])
            } else {
                arrOfSchools.push(data[i].ope_school_identifier);
            }
        };

        arrOfSchools.forEach((state) => {
            const schoolOptions = selectSchoolSelector
                .append("option")
                .text(state)
                .property("value");

        });

        const firstSchool = arrOfSchools[0]
        buildSchoolSpecificDotChart(firstSchool);
        buildSchoolSpecificChart(firstSchool);

    })

};

init();

// *********************************************************************************************
// END. CREATED BY ELLAINE TSZ YING HO JANUARY 2020.
// *********************************************************************************************