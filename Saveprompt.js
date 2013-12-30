(function ($) {


    /*Gloabal Variables  -- Start */
    var defaults =
       {
           Form: $("form"),
           onBefore_Submit: null,
           onBefore_Int: null,
           onFormChanged: null,
           PromptOnClose : true,
           ignoreClass: "Prompt-ignore",
           submitClass: "Prompt-Submit",
           PromptText: "Please Save Changes. "
       };

    var settings = defaults;
    var Intial_Data = $(settings.Form).serializeArray();
    var Final_data = "";
    var isChanged = false;

    /*Gloabal Variables  -- End */

    var SavePromptUtil = {

        /*functions*/
        isEqual: function (obj1, obj2) {

            var res = true;
            var names = SavePromptUtil.GetKeys(obj1, obj2);
            if (obj1 != "" && obj2 != "") {

                $.each(names, function (n, name) {

                    // var ignoreElement = $("[name='" + name + "']").hasClass(settings.ignoreClass);

                    var isSame = SavePromptUtil.isEqualwithName(obj1, obj2, name)

                    if (!isSame) {
                        res = false;
                        return res;
                    }

                })
            }

            return res;

        },

        isEqualwithName: function (obj1, obj2, name) {
            var res = false;

            $.each(obj1, function (i, o1) {
                if (o1.name == name) {
                    $.each(obj2, function (j, o2) {

                        if (o2.name == name) {

                            res = ($.trim(o2.value) == $.trim(o1.value));
                            return res;
                        }

                    });
                }

            });

            return res;

        },

        GetKeys: function (obj1, obj2) {
            var keys = [];
            var keys1 = SavePromptUtil.GetFormNames(obj1);
            var keys2 = SavePromptUtil.GetFormNames(obj2);
            var dups = keys1.concat(keys2);
            keys = dups.unique();


            return keys;
        },

        GetFormNames: function (obj) {
            var keys = [];

            $.each(obj, function (i, o) {
                var ignoreElement = $("[name='" + o.name + "']").hasClass(settings.ignoreClass);
                if (!ignoreElement)
                    keys.push(o.name);
            });

            return keys;
        }



        /*functions end*/

    };


    /*Plug in start*/
    $.SavePrompt = function (options) {

        settings = $.extend({}, defaults, options);

        if (settings.onBefore_Int != null && (typeof (window[settings.onBefore_Int]) === 'function')) {

            window[settings.onBefore_Int]();
        };

        Intial_Data = $(settings.Form).serializeArray();
        Final_data = Intial_Data;

        /*Events Fire*/
       
        $(document).on("change", ":text,select,textarea", function (event) {
            $.isFormChanged();

        });
        $(document).on("keyup", ":text,textarea", function (event) {
            $.isFormChanged();
        });
        $(document).on("click", "button", function (event) {

            $.isFormChanged();
        });

        $(":submit,." + settings.submitClass + "").on("click", function (e) {
            $.isFormChanged();

            if (isChanged) {

                $(window).unbind('beforeunload');

            }
            else {
                e.preventDefault();
                //alert("No Changes to Save ..!");

            }

        });

        $(window).on("beforeunload", function (e) {
            $.isFormChanged();
            if (isChanged && settings.PromptOnClose) {

                return settings.PromptText;

            }

        });


        /*Events Fire End*/





    };
    /*plugin end*/

    Array.prototype.contains = function (v) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === v) return true;
        }
        return false;
    };

    Array.prototype.unique = function () {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
            if (!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    }



    $.isFormChanged = function () {

        if ($(settings.Form).length > 0) {

            if (settings.onBefore_Submit != null && (typeof (window[settings.onBefore_Submit]) === 'function')) {

                window[settings.onBefore_Submit]();
            };
            Final_data = $(settings.Form).serializeArray();

            isChanged = !SavePromptUtil.isEqual(Intial_Data, Final_data);
            if (settings.onFormChanged != null)
                settings.onFormChanged(isChanged);


            return isChanged;
        }
        return true;

    }


    $.setFormChanged = function (val) {
        isChanged = val;
        if (settings.onFormChanged != null)
            settings.onFormChanged(isChanged);
    };



})(jQuery);



