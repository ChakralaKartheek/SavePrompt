
(function ($) {


    /*Gloabal Variables  -- Start */
    var defaults =
       {
           Form: $("form"),
           onBefore_Submit: null,
           onBefore_Int: null,
           onFormChanged: null,
           ignoreClass: "Prompt-ignore",
           submitClass: "Prompt-Submit",
           PromptText: "Please Save Changes. "
       };

    var settings = defaults;
    var Intial_Data = $(settings.Form).serializeArray();
    var Final_data = "";
    var isChanged = false;
    // $(":submit,." + settings.submitClass + "").attr("disabled", true);
    //$(":submit,." + settings.submitClass + "").attr("disabled", "disabled");
    /*Gloabal Variables  -- End */

    /*Events Fire*/
    $(":text,select,textarea").change(function (event) {
        $.isFormChanged();

    });
    $(":text,textarea").keyup(function (event) {
        $.isFormChanged();
    });
   
    $(document).click(function () {
        $.isFormChanged();
    });

    $(":submit,." + settings.submitClass + "").click(function (e) {
        $.isFormChanged();
        if (isChanged) {

            $(window).unbind('beforeunload');
            // alert("Changed");
        }
        else {
            e.preventDefault();
            alert("No Changes to Save ..!");

        }

    });

    $(window).bind("beforeunload", function (e) {

        if (isChanged) {

            return settings.PromptText;

        }

    });

    

    /*Events Fire End*/

    /*Plug in start*/
    $.SavePrompt = function (options) {
        settings = $.extend({}, defaults, options);
        if (settings.onBefore_Int != null && (typeof (window[settings.onBefore_Int]) === 'function')) {

            window[settings.onBefore_Int]();
        };

        Intial_Data = $(settings.Form).serializeArray();
        Final_data = Intial_Data;
    };
    /*plugin end*/

    var isEqual = function (obj1, obj2) {
        var res = true;
        if (obj1 != "" && obj2 != "") {
            for (key in obj2) {

                if (res) {

                    var name = obj2[key].name;
                    var ignoreElement = $("[name='" + name + "']").hasClass(settings.ignoreClass);


                    if (!ignoreElement &&
                        !((obj2[key].name == obj1[key].name)
                           && ($.trim(obj2[key].value) == $.trim(obj1[key].value)))) {
                        res = false;
                    }
                }
                else {
                    break;
                }
            }
        }

        return res;

    };

    $.isFormChanged = function () {

        if (settings.onBefore_Submit != null && (typeof (window[settings.onBefore_Submit]) === 'function')) {

            window[settings.onBefore_Submit]();
        };
        Final_data = $(settings.Form).serializeArray();

        isChanged = !isEqual(Intial_Data, Final_data);
        if (settings.onFormChanged != null)
            settings.onFormChanged(isChanged);
        //if (isChanged) {

        //    $(":submit,." + settings.submitClass + "").attr("disabled", "disabled");
        //    //if (document.title.indexOf("- Modified") == -1) {

        //    //    $('title').html(document.title + "- Modified");
        //    //}
        //}
        //else {
        //    $(":submit,." + settings.submitClass + "").removeAttr("disabled");
        //    //if (document.title.indexOf("- Modified") != -1) {

        //    //    $('title').html(document.title.replace("- Modified"));
        //    //}

        //}

        return isChanged;

    }


})(jQuery);


