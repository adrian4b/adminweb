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

$(function() {
    // setup ul.tabs to work as tabs for each div directly under div.panes
    $("ul.tabs").tabs("div.panes > div");
});