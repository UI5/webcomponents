/**
 * Different illustration types of Illustrated Message.
 * @public
 */
enum IllustrationMessageType {
	/**
	 * "Achievement" illustration type.
	 * @public
	 */
	Achievement = "Achievement",
	/**
	 * "Adding Columns" illustration type.
	 * @public
	 */
	AddingColumns = "AddingColumns",
	/**
	 * "Add People To Calendar" illustration type.
	 * @public
	 */
	AddPeopleToCalendar = "AddPeopleToCalendar",
	/**
	 * "Before Search" illustration type.
	 * @public
	 */
	BeforeSearch = "BeforeSearch",
	/**
	 * "Drag Files To Upload" illustration type.
	 * @public
	 */
	DragFilesToUpload = "DragFilesToUpload",
	/**
	 * "Filtering Columns" illustration type.
	 * @public
	 */
	FilteringColumns = "FilteringColumns",
	/**
	 * "Grouping Columns" illustration type.
	 * @public
	 */
	GroupingColumns = "GroupingColumns",
	/**
	 * "New Mail" illustration type.
	 * @public
	 */
	NewMail = "NewMail",
	/**
	 * "No Activities" illustration type.
	 * @public
	 */
	NoActivities = "NoActivities",
	/**
	 * "No Columns Set" illustration type.
	 * @public
	 */
	NoColumnsSet = "NoColumnsSet",
	/**
	 * "No Data" illustration type.
	 * @public
	 */
	NoData = "NoData",
	/**
	 * "No Email" illustration type.
	 * @public
	 */
	NoMail = "NoMail",
	/**
	 * "No Email v1" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoMail instead.
	 */
	NoMail_v1 = "NoMail_v1", // eslint-disable-line
	/**
	 * "No Entries" illustration type.
	 * @public
	 */
	NoEntries = "NoEntries",
	/**
	 * "No Notifications" illustration type.
	 * @public
	 */
	NoNotifications = "NoNotifications",
	/**
	 * "No Saved Items" illustration type.
	 * @public
	 */
	NoSavedItems = "NoSavedItems",
	/**
	 * "No Saved Items v1" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoSavedItems instead.
	 */
	NoSavedItems_v1 = "NoSavedItems_v1", // eslint-disable-line
	/**
	 * "No Search Results" illustration type.
	 * @public
	 */
	NoSearchResults = "NoSearchResults",
	/**
	 * "No Tasks" illustration type.
	 * @public
	 */
	NoTasks = "NoTasks",
	/**
	 * "No Tasks v1" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoTasks instead.
	 */
	NoTasks_v1 = "NoTasks_v1", // eslint-disable-line
	/**
	 * "No Dimensions Set" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoChartData instead.
	 */
	NoDimensionsSet = "NoDimensionsSet",
	/**
	 * "Unable To Load" illustration type.
	 * @public
	 */
	UnableToLoad = "UnableToLoad",
	/**
	 * "Unable To Load Image" illustration type.
	 * @public
	 */
	UnableToLoadImage = "UnableToLoadImage",
	/**
	 * "Unable To Upload" illustration type.
	 * @public
	 */
	UnableToUpload = "UnableToUpload",
	/**
	 * "Upload To Cloud" illustration type.
	 * @public
	 */
	UploadToCloud = "UploadToCloud",
	/**
	 * "Add Column" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use AddingColumns instead.
	 */
	AddColumn = "AddColumn",
	/**
	 * "Add People" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use AddPeopleToCalendar instead.
	 */
	AddPeople = "AddPeople",
	/**
	 * "Add Dimensions" illustration type.
	 * @public
	 */
	AddDimensions = "AddDimensions",
	/**
	 * "Balloon Sky" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use ReceiveAppreciation instead.
	 */
	BalloonSky = "BalloonSky",
	/**
	 * "Connection" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use UnableToLoad instead.
	 */
	Connection = "Connection",
	/**
	 * "Empty Calendar" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoActivities instead.
	 */
	EmptyCalendar = "EmptyCalendar",
	/**
	 * "Empty List" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoEntries instead.
	 */
	EmptyList = "EmptyList",
	/**
	 * "Empty Planning Calendar" illustration type.
	 * @public
	 */
	EmptyPlanningCalendar = "EmptyPlanningCalendar",
	/**
	 * "Error Screen" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use UnableToUpload instead.
	 */
	ErrorScreen = "ErrorScreen",
	/**
	 * "Filter Table" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use FilteringColumns instead.
	 */
	FilterTable = "FilterTable",
	/**
	 * "Group Table" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use GroupingColumns instead.
	 */
	GroupTable = "GroupTable",
	/**
	 * "Key Task" illustration type.
	 * @public
	 */
	KeyTask = "KeyTask",
	/**
	 * "No Chart Data" illustration type.
	 * @public
	 */
	NoChartData = "NoChartData",
	/**
	 * "No Filter Results" illustration type.
	 * @public
	 */
	NoFilterResults = "NoFilterResults",
	/**
	 * "Page Not Found" illustration type.
	 * @public
	 */
	PageNotFound = "PageNotFound",
	/**
	 * "Reload Screen" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use UnableToLoad instead.
	 */
	ReloadScreen = "ReloadScreen",
	/**
	 * "Resize Column" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use ResizingColumns instead.
	 */
	ResizeColumn = "ResizeColumn",
	/**
	 * "Resizing Columns" illustration type.
	 * @public
	 */
	ResizingColumns = "ResizingColumns",
	/**
	 * "Receive Appreciation" illustration type.
	 * @public
	 */
	ReceiveAppreciation = "ReceiveAppreciation",
	/**
	 * "Search Earth" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use BeforeSearch instead.
	 */
	SearchEarth = "SearchEarth",
	/**
	 * "Search Folder" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoSearchResults instead.
	 */
	SearchFolder = "SearchFolder",
	/**
	 * "Sign Out" illustration type.
	 * @public
	 */
	SignOut = "SignOut",
	/**
	 * "Simple Balloon" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use ReceiveAppreciation instead.
	 */
	SimpleBalloon = "SimpleBalloon",
	/**
	 * "Simple Bell" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoNotifications instead.
	 */
	SimpleBell = "SimpleBell",
	/**
	 * "Simple Calendar" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoActivities instead.
	 */
	SimpleCalendar = "SimpleCalendar",
	/**
	 * "Simple CheckMark" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use KeyTask instead.
	 */
	SimpleCheckMark = "SimpleCheckMark",
	/**
	 * "Simple Connection" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use UnableToLoad instead.
	 */
	SimpleConnection = "SimpleConnection",
	/**
	 * "Simple Empty Doc" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoData instead.
	 */
	SimpleEmptyDoc = "SimpleEmptyDoc",
	/**
	 * "Simple Empty List" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoEntries instead.
	 */
	SimpleEmptyList = "SimpleEmptyList",
	/**
	 * "Simple Error" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use UnableToUpload instead.
	 */
	SimpleError = "SimpleError",
	/**
	 * "Simple Magnifier" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use BeforeSearch instead.
	 */
	SimpleMagnifier = "SimpleMagnifier",
	/**
	 * "Simple Mail" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoMail instead.
	 */
	SimpleMail = "SimpleMail",
	/**
	 * "Simple No Saved Items" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoSavedItems instead.
	 */
	SimpleNoSavedItems = "SimpleNoSavedItems",
	/**
	 * "Simple Not Found Magnifier" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoSearchResults instead.
	 */
	SimpleNotFoundMagnifier = "SimpleNotFoundMagnifier",
	/**
	 * "Simple Reload" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use UnableToLoad instead.
	 */
	SimpleReload = "SimpleReload",
	/**
	 * "Simple Task" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoTasks instead.
	 */
	SimpleTask = "SimpleTask",
	/**
	 * "Sleeping Bell" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoNotifications instead.
	 */
	SleepingBell = "SleepingBell",
	/**
	 * "Sort Column" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use SortingColumns instead.
	 */
	SortColumn = "SortColumn",
	/**
	 * "Sorting Columns" illustration type.
	 * @public
	 */
	SortingColumns = "SortingColumns",
	/**
	 * "Success Balloon" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use ReceiveAppreciation instead.
	 */
	SuccessBalloon = "SuccessBalloon",
	/**
	 * "Success CheckMark" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use KeyTask instead.
	 */
	SuccessCheckMark = "SuccessCheckMark",
	/**
	 * "Success HighFive" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use ReceiveAppreciation instead.
	 */
	SuccessHighFive = "SuccessHighFive",
	/**
	 * "Success Screen" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use KeyTask instead.
	 */
	SuccessScreen = "SuccessScreen",
	/**
	 * "Survey" illustration type.
	 * @public
	 */
	Survey = "Survey",
	/**
	 * "Tent" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use NoData instead.
	 */
	Tent = "Tent",
	/**
	 * "Upload Collection" illustration type.
	 * @public
	 * @deprecated Deprecated as of version 2.11.0, use DragFilesToUpload instead.
	 */
	UploadCollection = "UploadCollection",
	/**
	 * "User Has Signed Up" illustration type.
	 * @public
	 */
	UserHasSignedUp = "UserHasSignedUp",
	/**
	* "TntAvatar" illustration type.
	* @public
	*/
	TntAvatar = "TntAvatar",
	/**
	* "TntCalculator" illustration type.
	* @public
	*/
	TntCalculator = "TntCalculator",
	/**
	* "TntChartArea" illustration type.
	* @public
	*/
	TntChartArea = "TntChartArea",
	/**
	* "TntChartArea2" illustration type.
	* @public
	*/
	TntChartArea2 = "TntChartArea2",
	/**
	* "TntChartBar" illustration type.
	* @public
	*/
	TntChartBar = "TntChartBar",
	/**
	* "TntChartBPMNFlow" illustration type.
	* @public
	*/
	TntChartBPMNFlow = "TntChartBPMNFlow",
	/**
	* "TntChartBullet" illustration type.
	* @public
	*/
	TntChartBullet = "TntChartBullet",
	/**
	* "TntChartDoughnut" illustration type.
	* @public
	*/
	TntChartDoughnut = "TntChartDoughnut",
	/**
	* "TntChartFlow" illustration type.
	* @public
	*/
	TntChartFlow = "TntChartFlow",
	/**
	* "TntChartGantt" illustration type.
	* @public
	*/
	TntChartGantt = "TntChartGantt",
	/**
	* "TntChartOrg" illustration type.
	* @public
	*/
	TntChartOrg = "TntChartOrg",
	/**
	* "TntChartPie" illustration type.
	* @public
	*/
	TntChartPie = "TntChartPie",
	/**
	* "TntCodePlaceholder" illustration type.
	* @public
	*/
	TntCodePlaceholder = "TntCodePlaceholder",
	/**
	* "TntCompany" illustration type.
	* @public
	*/
	TntCompany = "TntCompany",
	/**
	* "TntCompass" illustration type.
	* @public
	*/
	TntCompass = "TntCompass",
	/**
	* "TntComponents" illustration type.
	* @public
	*/
	TntComponents = "TntComponents",
	/**
	* "TntDialog" illustration type.
	* @public
	*/
	TntDialog = "TntDialog",
	/**
	* "TntEmptyContentPane" illustration type.
	* @public
	*/
	TntEmptyContentPane = "TntEmptyContentPane",
	/**
	* "TntExternalLink" illustration type.
	* @public
	*/
	TntExternalLink = "TntExternalLink",
	/**
	* "TntFaceID" illustration type.
	* @public
	*/
	TntFaceID = "TntFaceID",
	/**
	* "TntFingerprint" illustration type.
	* @public
	*/
	TntFingerprint = "TntFingerprint",
	/**
	* "TntHandshake" illustration type.
	* @public
	*/
	TntHandshake = "TntHandshake",
	/**
	* "TntHelp" illustration type.
	* @public
	*/
	TntHelp = "TntHelp",
	/**
	* "TntLock" illustration type.
	* @public
	*/
	TntLock = "TntLock",
	/**
	* "TntMission" illustration type.
	* @public
	*/
	TntMission = "TntMission",
	/**
	* "TntMissionFailed" illustration type.
	* @public
	*/
	TntMissionFailed = "TntMissionFailed",
	/**
	* "TntNoApplications" illustration type.
	* @public
	*/
	TntNoApplications = "TntNoApplications",
	/**
	* "TntNoFlows" illustration type.
	* @public
	*/
	TntNoFlows = "TntNoFlows",
	/**
	* "TntNoUsers" illustration type.
	* @public
	*/
	TntNoUsers = "TntNoUsers",
	/**
	* "TntRadar" illustration type.
	* @public
	*/
	TntRadar = "TntRadar",
	/**
	* "TntRoadMap" illustration type.
	* @public
	*/
	TntRoadMap = "TntRoadMap",
	/**
	* "TntSecrets" illustration type.
	* @public
	*/
	TntSecrets = "TntSecrets",
	/**
	* "TntServices" illustration type.
	* @public
	*/
	TntServices = "TntServices",
	/**
	* "TntSessionExpired" illustration type.
	* @public
	*/
	TntSessionExpired = "TntSessionExpired",
	/**
	* "TntSessionExpiring" illustration type.
	* @public
	*/
	TntSessionExpiring = "TntSessionExpiring",
	/**
	* "TntSettings" illustration type.
	* @public
	*/
	TntSettings = "TntSettings",
	/**
	* "TntSuccess" illustration type.
	* @public
	*/
	TntSuccess = "TntSuccess",
	/**
	* "TntSuccessfulAuth" illustration type.
	* @public
	*/
	TntSuccessfulAuth = "TntSuccessfulAuth",
	/**
	* "TntSystems" illustration type.
	* @public
	*/
	TntSystems = "TntSystems",
	/**
	* "TntTeams" illustration type.
	* @public
	*/
	TntTeams = "TntTeams",
	/**
	* "TntTools" illustration type.
	* @public
	*/
	TntTools = "TntTools",
	/**
	* "TntTutorials" illustration type.
	* @public
	*/
	TntTutorials = "TntTutorials",
	/**
	* "TntUnableToLoad" illustration type.
	* @public
	*/
	TntUnableToLoad = "TntUnableToLoad",
	/**
	* "TntUnlock" illustration type.
	* @public
	*/
	TntUnlock = "TntUnlock",
	/**
	* "TntUnsuccessfulAuth" illustration type.
	* @public
	*/
	TntUnsuccessfulAuth = "TntUnsuccessfulAuth",
	/**
	* "TntUser2" illustration type.
	* @public
	*/
	TntUser2 = "TntUser2",

}

export default IllustrationMessageType;
