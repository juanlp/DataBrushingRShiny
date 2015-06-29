require(shiny)
iris <- datasets::iris
names(iris) <- gsub('[/.]','_',tolower(names(iris)))
specs <- as.character(unique(iris$species))
names(specs) <- specs

shinyUI(fluidRow(
    headerPanel("Data Brushing with Shiny/Javascript"), 
    mainPanel(
      tags$head(
        includeScript('www/jquery.js'),
        includeScript('www/jquery.flot.js'),
        includeScript('www/floatdata.js'),
        includeCSS('www/examples.css')
      ),
      HTML(paste('<script> window.irisfreq=',RJSONIO::toJSON(as.data.frame(table(iris$species)), byrow=T, colNames=T),';</script>')),
      htmlOutput("json"),
      HTML('
           <div id="header">
		       <h2></h2>
           </div>
           <p>An example of interacting between two charts with data sent from Shiny to Javascript and vice-versa</p>
           <p>The charts are created using Flot <a href="http://www.flotcharts.org/flot/examples/">Flot library</a></p>
           <p>The bar chart presents the number of observation per species in the iris data. Double-click on each bar to see the scatter plot for each subset</p>
           <p>R is used to subsetting data and sending the data to javascript object as json object</p>
           <div id="content">
           <div class="demo-container">
           <div id="flot-placeholder" class="demo-placeholder"></div>
           </div>
           <div class="demo-container">
           <div id="placeholder2" class="demo-placeholder"></div>	
           </div>
           </div>
           <div id="footer"> 
           </div>
           ')
    )
  )
)