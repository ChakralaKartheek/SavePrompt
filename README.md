SavePrompt
==========

This is to manage Save Prompt in Web Forms


Requirements to Run :
============================
 
  1.JQuery plug in need to include in Form
  
  
How to Use :
============================

 $.SavePrompt();
 
 or
 
 $.SavePrompt(options);
 
 Call this function in Page Load of the document
 
 Options to User Save Prompt
 ============================
 
   Form : 
         default Value : $(Form) (It identifies top most Form element in the document )
         
         we can specify to work on specific only like 
         
         Ex : Form :$("#SampleForm"),
         
   onBefore_Int :
          
          default Value : NULL
          
          It will Excecute on fist time to collect Intial Data. It helps to handle dynamic content created from  
          JavaScript or JQuery. If there is any function specify name
          
          Ex : onBefore_Int :"Sample_Before_Int"
          
    onBefore_Submit :
    
          default Value : NULL
          
          It will Excecute Every time to collect Latest Form Data.It helps to handle dynamic content created from 
           JavaScript or JQuery. If there is any function specify name
          
          Ex : onBefore_Submit :"Sample_onBefore_Submit"
          
          
     onFormChanged :
     
           default Value : NULL
           
           It will Excecute on every change of Form
           
           Ex : onFormChanged : function ()
                                 {
                                      // Do Some thing
                                 }
                                 
      PromptOnClose : 
         
          default Value : TRUE
          
          By default on window close if there is any change it will prompt. if you don't want to prompt then put it as 
          false.
          
          Ex :  PromptOnClose : false
          
      
      ignoreClass : 
           
           default Value : "Prompt-ignore"
           
           If you don't want to consider some of the elements in Form then include the elements class name here.
           
           Ex : ignoreClass : "ignore-this-element"
           
       
       submitClass:
              
          default Value : "Prompt-Submit"
          
          By default Prompt will ignore for Submit button in Form. if there is any element to ignore specify that 
          element's class name
          
          Ex : submitClass : "Custom-Submit-button"
          
          
        PromptText :
            
            default Value : "Please Save Changes." 
            
            Prompt Text to display on Prompt window. 
            
            
            Ex :  PromptText : "My own Prompt Text"
            
            
    Sample Use with options
    ==============================
    
        $(".mySubmitButton").button();
        $(".mySubmitButton").button({ disabled: true });

        $.SavePrompt(
            {
                Form: $("#Myform"),
                onBefore_Submit: "before_Submit",
                onBefore_Int: "before_Int",
                ignoreClass: "Prompt-ignore",
                submitClass: "Prompt-Submit",
                PromptText: "Don't Leave with out Save ",
                onFormChanged: function (FormChanged) {
                    if (FormChanged) {
                        $(".mySubmitButton").button({ disabled: false });
                    }
                    else {
                        $(".mySubmitButton").button({ disabled: true });
                    }
                }
            });
    
    
    
           
          
          
         
 
