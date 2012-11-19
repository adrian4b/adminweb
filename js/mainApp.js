var baseurl = "/BasicJsonService.svc/";
function viewModel() {
	var self = this;

	self.userName = ko.observable(""); 
	self.userPassword = ko.observable("");
        
        
    self.processLogin = function() {
	var localUrl = baseurl+"login(" + self.userName()+","+self.userPassword()+ ")";
    //alert(localUrl);
        			
	$.ajax({
					cache: false,
					type: "GET",
					async: false,
					url: localUrl,
					dataType: "json",
					success: function (msg) {
						alert(msg);
					},
					error: function (xhr) {
						alert(xhr.responseText);
					}
				});
			$("#login").hide("slow");
			$("#desktop").delay(1000).show();
			
			
    };
        
    self.refreshErrorsList = function (){
        	$("#refreshErrorsListButton").hide("slow").delay(5000).show("slow");
    };
        
    self.refreshActiveSessions = function (){
        	$("#refreshActiveSessionsButton").hide("slow").delay(5000).show("slow");
    };
    
    var activeSessionsInitialData = [{UserName:"test", FirmName:"test", SSL:"false",SessionOpened:""},
							{UserName:"test3", FirmName:"test78", SSL:"false",SessionOpened:""}];
	
    this.activeSessionsList = ko.observableArray(activeSessionsInitialData);
        
    this.ActiveUsersViewModel = new ko.simpleGrid.viewModel({
        data: this.activeSessionsList,
        columns: [
            { headerText: "User Name", rowText: "UserName" },
            { headerText: "Firm Name", rowText: "FirmName" },
            { headerText: "Using SSL", rowText: "SSL" },
            { headerText: "Session Opened", rowText: "SessionOpened" }
        ],
        pageSize: 20
    });
    
    self.errorsListInitialData = [{UserName:"test", FirmName:"test", ErrorSummary:"error",DateTime:""},
							{UserName:"test3", FirmName:"test78", ErrorSummary:"false",DateTime:""}];
};
    
$(function() {
	ko.applyBindings(new viewModel());
});


$(document).ready(function(){

	$("#tabs li").click(function() {
		//	First remove class "active" from currently active tab
		$("#tabs li").removeClass('active');
		//	Now add class "active" to the selected/clicked tab
		$(this).addClass("active");
		//	Hide all tab content
		$(".tab_content").hide();
		//	Here we get the href value of the selected tab
		var selected_tab = $(this).find("a").attr("href");
		//	Show the selected tab content
		$(selected_tab).fadeIn();
		//	At the end, we add return false so that the click on the link is not executed
		return false;
	});
});