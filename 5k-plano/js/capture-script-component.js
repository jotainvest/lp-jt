/* Minification failed. Returning unminified contents.
(182,73-74): run-time error JS1195: Expected expression: >
(189,8-9): run-time error JS1195: Expected expression: )
(190,5-6): run-time error JS1002: Syntax error: }
(192,39-40): run-time error JS1004: Expected ';': {
(377,1-2): run-time error JS1002: Syntax error: }
 */
// IIFE - Immediately Invoked Function Expression
(function (load) {
  // The global jQuery object is passed as a parameter
  load(window.jQuery, window, document);
})(function ($, window, document) {
  // The $ is now locally scoped
  // Listen for the jQuery ready event on the document
  $(function () {
    loadCaptureForm();
  });
  // The rest of the code goes here!
  function clearErrors(form) {
    form.find(".field-error").remove();
  }
  function clearError() {
    var forms = $("form");
    if (forms.length > 0) {
      var form = null;
      $.each(forms, function () {
        // set form element
        form = $(this);
        // clear error
        form.find("div.bee-form-row").show();
        form.find("div.form-row").show();
        form.find('button[type="submit"]').show();
        form.find("div.loading-box").hide();
        form.find("div.error-box").hide();
        setFormDisplay(form, "grid");
      });
    }
  }
  function loadCaptureForm() {
    var forms = $("form:not([formulario-externo])");
    if (forms.length > 0) {
      var form = null;
      $.each(forms, function () {
        var element = null;
        var additionalBot = new Array();
        var additionalTop = new Array();
        // set form element
        form = $(this);
        // set form action
        form.prop("action", "/capture");
        // set form method
        form.prop("method", "post");
        // set submit button
        if (form.find('button[type="submit"]').length == 0)
          form.find("button:first").prop("type", "submit");
        // set machine id
        if (form.find("#mid").length > 0) form.find("#mid").val(_machineID);
        else {
          element = $("<input />");
          element.prop({
            id: "mid",
            name: "mid",
            type: "hidden",
          });
          element.val(_machineID);
          additionalTop.push(element.clone());
        }
        // set page id
        if (form.find("#pid").length > 0) form.find("#pid").val(_pageID);
        else {
          element = $("<input />");
          element.prop({
            id: "pid",
            name: "pid",
            type: "hidden",
          });
          element.val(_pageID);
          additionalTop.push(element.clone());
        }
        // set block id
        var blockHDN = form.find(
          'input[type="hidden"][name="hdn-dynamic-fields"]'
        );
        if (!!blockHDN && blockHDN.length > 0) {
          var blockID = parseInt(blockHDN.attr("id").split("-")[3]);
          if (form.find("#bid").length > 0) form.find("#bid").val(blockID);
          else {
            element = $("<input />");
            element.prop({
              id: "bid",
              name: "bid",
              type: "hidden",
            });
            element.val(blockID);
            additionalTop.push(element.clone());
          }
          $(blockHDN).remove();
        }
        // set machine id for hotleads
        if (form.find("#list_id").length > 0)
          form.find("#list_id").val(_machineID);
        else {
          element = $("<input />");
          element.prop({
            id: "list_id",
            name: "list_id",
            type: "hidden",
          });
          element.val(_machineID);
          additionalTop.push(element.clone());
        }
        // set provider for hotleads
        if (form.find("#provider").length > 0)
          form.find("#provider").val("leadlovers");
        else {
          element = $("<input />");
          element.prop({
            id: "provider",
            name: "provider",
            type: "hidden",
          });
          element.val("leadlovers");
          additionalTop.push(element.clone());
        }
        // set form type
        if (!form.find("#formType").length) {
          element = $("<input />");
          element.prop({
            id: "formType",
            name: "formType",
            type: "hidden",
          });
          element.val("static");
          additionalTop.push(element.clone());
        }
        // set origin
        if (!form.find("#origin").length) {
          element = $("<input />");
          element.prop({
            id: "origin",
            name: "origin",
            type: "hidden",
          });
          element.val(window.location.href || "");
          additionalTop.push(element.clone());
        }
        // append loading box
        if (form.find(".loading-box").length == 0) {
          var img = $("<img />");
          img.prop("src", "//paginas.rocks/content/images/spinner.gif");
          var div = $("<div>");
          div.text("aguarde");
          element = $("<div>");
          element.addClass("loading-box");
          element.append(img, div);
          additionalBot.push(element.clone());
        }
        // append error box
        if (form.find(".error-box").length == 0) {
          var img = $("<img />");
          img.prop("src", "//paginas.rocks/content/images/error-icon.png");
          var div = $("<div>");
          var btn = $("<button>");
          btn.prop({
            type: "button",
            id: "btn-error",
          });
          btn.addClass("btn btn-default");
          btn.text("Ok");
          element = $("<div>");
          element.addClass("error-box");
          element.append(img, div, btn);
          additionalBot.push(element.clone());
        }
        // append additional elements...
        if (additionalTop.length > 0) form.prepend(additionalTop);
        if (additionalBot.length > 0) form.append(additionalBot);
        // clear error event
        form.find(".error-box > button").on("click", function () {
          clearError();
        });
        // set required fields by data-attribute
        setRequiredFields(form);
        // set submit event
        submitHandler(form);
      });
      //set default radio
      const radioGroups = {};
      document.querySelectorAll('input[type="radio"]').forEach((input) => {
        const groupName = input.getAttribute("name");
        if (!radioGroups[groupName]) {
          radioGroups[groupName] = true;
          input.checked = true;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });
    }
  }
  function setFormDisplay(form, type) {
    if (type === "flex") {
      form.css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });
    } else {
      form.css({
        display: "grid",
      });
    }
  }
  function setRequiredFields(form) {
    const requiredFields = form
      .find("input,textarea,select")
      .filter("[required]");
    if (requiredFields.length > 0) {
      $.each(requiredFields, function () {
        $(this).removeAttr("required");
        $(this).attr("data-required", true);
      });
    }
  }
  function submitForm(form) {
    var formData = form.serializeArray().reduce(function (obj, item) {
      let value = obj[item.name] ? obj[item.name].split(",") : [];
      value.push(item.value);
      obj[item.name] = value.join(",");
      return obj;
    }, {});
    return $.ajax({
      url: form.prop("action"),
      method: form.prop("method"),
      data: formData,
      beforeSend: function () {
        form.find("div.bee-form-row").hide();
        form.find("div.form-row").hide();
        form.find('button[type="submit"]').hide();
        form.find("div.loading-box").show();
        setFormDisplay(form, "flex");
      },
    });
  }
  function submitHandler(form) {
    form.on("submit", function (e) {
      // clear errors
      clearErrors(form);
      // required validations
      var valid = true;
      var fields = $(this).find('[data-required="true"]');
      if (fields.length > 0) {
        $(fields).each(function () {
          var tag = $(this).prop("tagName").toLowerCase();
          if (
            tag == "div" &&
            ($(this).hasClass("checkbox-list") || $(this).hasClass("list"))
          ) {
            if (
              $(this).find('input[type="checkbox"]:checked').length == 0 &&
              $(this).find('input[type="radio"]:checked').length == 0
            ) {
              if (
                $(this).find('input[type="checkbox"]').prop("id") ==
                "LGPDValidation"
              ) {
                $(
                  '<div class="field-error">Esse campo precisa ser confirmado</div>'
                ).insertBefore($(this));
              } else {
                $(
                  '<div class="field-error">Selecione ao menos uma opção</div>'
                ).insertBefore($(this));
                console.info(
                  "O campo de múltipla escolha requer que você selecione ao menos uma opção"
                );
              }
              valid = false;
            }
          } else {
            if (
              $(this).val().trim() === "" ||
              $(this).val().trim() === "Selecione"
            ) {
              $(
                '<div class="field-error">Esse campo é obrigatório</div>'
              ).insertAfter($(this));
              console.info(
                "O campo " + $(this).prop("name") + " é obrigatório"
              );
              valid = false;
            }
          }
        });
      }
      const customRequiredFields = $("#requiredFields");
      if (customRequiredFields.length && customRequiredFields.val()) {
        const requiredFields = customRequiredFields.val().split(",");
        if (requiredFields.length) {
          $(requiredFields).each(function () {
            const field = $(this);
            if (field.attr("type") === "checkbox") {
              if (!$(this).is(":checked")) {
                const root = $(this).parents(".bee-form-row");
                if (root.length) {
                  $(
                    '<div class="field-error">Este campo é obrigatório</div>'
                  ).insertBefore(root);
                  console.info(
                    "O campo " + field.attr("name") + " é obrigatório"
                  );
                  valid = false;
                }
              }
            } else if (field.attr("type") === "select") {
              if (!$(this).find("option:selected").length) {
                const root = $(this).parents(".bee-form-row");
                if (root.length) {
                  $(
                    '<div class="field-error">Selecione ' +
                      (field.attr("type") === "checkbox" ? "ao menos " : "") +
                      "uma opção</div>"
                  ).insertBefore(root);
                  console.info(
                    "O campo " + field.attr("name") + " é obrigatório"
                  );
                  valid = false;
                }
              }
            }
          });
        }
      }
      // submit form through ajax... if valid...
      if (valid) {
        submitForm(form).done(function (data) {
          if (!!data.errors) {
            var err = "";
            form.find("div.loading-box").hide();
            $(data.errors).each(function () {
              if (!!this.field && this.field != "") {
                const fieldName = this.field.replace("#llerror", "llfield");
                const fieldObj = form.find("input").filter(function () {
                  return $(this).attr("name").toLowerCase() === fieldName;
                });
                if (fieldObj && fieldObj.length) {
                  $(
                    '<div class="field-error">' + this.error + "</div>"
                  ).insertAfter(fieldObj[0]);
                }
              } else err += "<br />" + this.error;
            });
            if (err != "") {
              form.find("div.error-box>div").html(err);
              form.find("div.error-box").show();
            } else {
              form.find("div.bee-form-row").show();
              form.find("div.form-row").show();
              form.find('button[type="submit"]').show();
              setFormDisplay(form, "grid");
            }
          } else {
            data = data.startsWith("http") ? data : "http://" + data;
            const queries = new URLSearchParams(data);
            if (queries.get("target") === "_blank") {
              window.open(data, "_blank");
              form.find("div.loading-box").hide();
              form.find("div.bee-form-row").show();
              form.find("div.form-row").show();
              form.find('button[type="submit"]').show();
              setFormDisplay(form, "grid");
              form.append(
                '<p style="color: #fff">Dados enviados com sucesso!</p>'
              );
            } else {
              window.location.href = data;
            }
          }
        });
      }
      // prevent default event
      e.preventDefault();
      return false;
    });
  }
});
;
