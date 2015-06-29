//Plotting IRIS Histogram and Brushing by Speicies
 $(function(){
    var iris_freq_values = [];   //Passing Frequency values to Java
    for(var i in irisfreq) {iris_freq_values.push([i, irisfreq[i].Freq])}
    var iris_freq_names = [];    //Passing Frequency species to Java
    for(var j in irisfreq) {iris_freq_names.push([j, irisfreq[j].Var1])}
    //Plotting Bar Charts using FLOT library
        var dataset = [{ label: "iris data's speicies (freq)", data: iris_freq_values, color: "#5482FF" }];
        var ticks = iris_freq_names;
        var options = {
            series: {
                bars: {
                    show: true
                }
            },
            bars: {
                align: "center",
                barWidth: 0.5
            },
            xaxis: {
                axisLabel: "Species",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 10,
                ticks: ticks
            },
            yaxis: {
                axisLabel: "Frequency",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 3,
                tickFormatter: function (v, axis) {
                    return v + "";  //put units
                }
            },
            legend: {
                noColumns: 0,
                labelBoxBorderColor: "#000000",
                position: "nw"
            },
            grid: {
                hoverable: true,
                clickable: true,
                borderWidth: 2,
                backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
            }
        };
        $(document).ready(function () {
            $.plot($("#flot-placeholder"), dataset, options);  //Plotting Bar Charts
            $("#flot-placeholder").UseTooltip();
        });
        function gd(year, month, day) {
            return new Date(year, month, day).getTime();
        }
        var previousPoint = null, previousLabel = null;
        $.fn.UseTooltip = function () {
            $(this).bind("plothover", function (event, pos, item) {
                if (item) {
                    if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                        previousPoint = item.dataIndex;
                        previousLabel = item.series.label;
                        $("#tooltip").remove();
                        var x = item.datapoint[0];
                        var y = item.datapoint[1];
                        var color = item.series.color;
                        showTooltip(item.pageX,
                        item.pageY,
                        color,
                        "<strong>" + item.series.label + "</strong><br>" + item.series.xaxis.ticks[x].label + " : <strong>" + y + "</strong> obs");
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
            //Dynamic data based on what selected in the first chart
            $(this).bind("plotclick", function (event, pos, item) {
              var x = item.datapoint[0].toFixed(2), y = item.datapoint[1].toFixed(2);
              Shiny.onInputChange("selspecies", x);  //Sending data from javascript object to shiny
              var data,data1,options,chart;
              data1 = datafromshiny;
              var data2 = [];
              for(var i in data1) { data2.push([data1[i].sepal_length, data1[i].sepal_width])}
              data = [{ data:data2, label:"Scatter Plot by Species", lines:{show:false}, points:{show:true}}];
              options = {
                          series: {
                              points: {
                                  radius: 3,
                                  show: true,
                                  fill: true,
                                  fillColor: "#058DC7"
                              },
                              color: "#058DC7"
                          }
                        };
              $(document).ready(function(){
                chart2 = $.plot($("#placeholder2"),data,options);  
              });
            });
        };
 
        function showTooltip(x, y, color, contents) {
            $('<div id="tooltip">' + contents + '</div>').css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x - 120,
                border: '2px solid ' + color,
                padding: '3px',
                'font-size': '9px',
                'border-radius': '5px',
                'background-color': '#fff',
                'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                opacity: 0.9
            }).appendTo("body").fadeIn(200);
        }
 })
