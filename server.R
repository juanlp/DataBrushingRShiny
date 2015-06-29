library(shiny)
iris <- datasets::iris
names(iris) <- gsub('[/.]','_',tolower(names(iris)))

shinyServer(
  function(input, output) {
    output$json <- reactive({
      if(is.null(iris$species)) {id = 1} else {id = as.numeric(input$selspecies)+1}
      specs <- as.character(unique(iris$species))
      selspecies <- specs[id]
      paste('<script> window.datafromshiny=', 
            RJSONIO::toJSON(iris[iris$species == selspecies,], byrow=T, colNames=T),
            ';console.log(data[0]);', # print 1 data line to console
            '</script>')
    })
  }
)    