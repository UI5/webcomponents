/**
 * Different illustration types of Illustrated Message.
 * @public
 */
var IllustrationMessageType;
(function (IllustrationMessageType) {
    /**
     * "Achievement" illustration type.
     * @public
     */
    IllustrationMessageType["Achievement"] = "Achievement";
    /**
     * "Adding Columns" illustration type.
     * @public
     */
    IllustrationMessageType["AddingColumns"] = "AddingColumns";
    /**
     * "Add People To Calendar" illustration type.
     * @public
     */
    IllustrationMessageType["AddPeopleToCalendar"] = "AddPeopleToCalendar";
    /**
     * "Before Search" illustration type.
     * @public
     */
    IllustrationMessageType["BeforeSearch"] = "BeforeSearch";
    /**
     * "Drag Files To Upload" illustration type.
     * @public
     */
    IllustrationMessageType["DragFilesToUpload"] = "DragFilesToUpload";
    /**
     * "Filtering Columns" illustration type.
     * @public
     */
    IllustrationMessageType["FilteringColumns"] = "FilteringColumns";
    /**
     * "Grouping Columns" illustration type.
     * @public
     */
    IllustrationMessageType["GroupingColumns"] = "GroupingColumns";
    /**
     * "New Mail" illustration type.
     * @public
     */
    IllustrationMessageType["NewMail"] = "NewMail";
    /**
     * "No Activities" illustration type.
     * @public
     */
    IllustrationMessageType["NoActivities"] = "NoActivities";
    /**
     * "No Columns Set" illustration type.
     * @public
     */
    IllustrationMessageType["NoColumnsSet"] = "NoColumnsSet";
    /**
     * "No Data" illustration type.
     * @public
     */
    IllustrationMessageType["NoData"] = "NoData";
    /**
     * "No Email" illustration type.
     * @public
     */
    IllustrationMessageType["NoMail"] = "NoMail";
    /**
     * "No Email v1" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoMail instead.
     */
    IllustrationMessageType["NoMail_v1"] = "NoMail_v1";
    /**
     * "No Entries" illustration type.
     * @public
     */
    IllustrationMessageType["NoEntries"] = "NoEntries";
    /**
     * "No Notifications" illustration type.
     * @public
     */
    IllustrationMessageType["NoNotifications"] = "NoNotifications";
    /**
     * "No Saved Items" illustration type.
     * @public
     */
    IllustrationMessageType["NoSavedItems"] = "NoSavedItems";
    /**
     * "No Saved Items v1" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoSavedItems instead.
     */
    IllustrationMessageType["NoSavedItems_v1"] = "NoSavedItems_v1";
    /**
     * "No Search Results" illustration type.
     * @public
     */
    IllustrationMessageType["NoSearchResults"] = "NoSearchResults";
    /**
     * "No Tasks" illustration type.
     * @public
     */
    IllustrationMessageType["NoTasks"] = "NoTasks";
    /**
     * "No Tasks v1" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoTasks instead.
     */
    IllustrationMessageType["NoTasks_v1"] = "NoTasks_v1";
    /**
     * "No Dimensions Set" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoChartData instead.
     */
    IllustrationMessageType["NoDimensionsSet"] = "NoDimensionsSet";
    /**
     * "Unable To Load" illustration type.
     * @public
     */
    IllustrationMessageType["UnableToLoad"] = "UnableToLoad";
    /**
     * "Unable To Load Image" illustration type.
     * @public
     */
    IllustrationMessageType["UnableToLoadImage"] = "UnableToLoadImage";
    /**
     * "Unable To Upload" illustration type.
     * @public
     */
    IllustrationMessageType["UnableToUpload"] = "UnableToUpload";
    /**
     * "Upload To Cloud" illustration type.
     * @public
     */
    IllustrationMessageType["UploadToCloud"] = "UploadToCloud";
    /**
     * "Add Column" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use AddingColumns instead.
     */
    IllustrationMessageType["AddColumn"] = "AddColumn";
    /**
     * "Add People" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use AddPeopleToCalendar instead.
     */
    IllustrationMessageType["AddPeople"] = "AddPeople";
    /**
     * "Add Dimensions" illustration type.
     * @public
     */
    IllustrationMessageType["AddDimensions"] = "AddDimensions";
    /**
     * "Balloon Sky" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use ReceiveAppreciation instead.
     */
    IllustrationMessageType["BalloonSky"] = "BalloonSky";
    /**
     * "Connection" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use UnableToLoad instead.
     */
    IllustrationMessageType["Connection"] = "Connection";
    /**
     * "Empty Calendar" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoActivities instead.
     */
    IllustrationMessageType["EmptyCalendar"] = "EmptyCalendar";
    /**
     * "Empty List" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoEntries instead.
     */
    IllustrationMessageType["EmptyList"] = "EmptyList";
    /**
     * "Empty Planning Calendar" illustration type.
     * @public
     */
    IllustrationMessageType["EmptyPlanningCalendar"] = "EmptyPlanningCalendar";
    /**
     * "Error Screen" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use UnableToUpload instead.
     */
    IllustrationMessageType["ErrorScreen"] = "ErrorScreen";
    /**
     * "Filter Table" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use FilteringColumns instead.
     */
    IllustrationMessageType["FilterTable"] = "FilterTable";
    /**
     * "Group Table" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use GroupingColumns instead.
     */
    IllustrationMessageType["GroupTable"] = "GroupTable";
    /**
     * "Key Task" illustration type.
     * @public
     */
    IllustrationMessageType["KeyTask"] = "KeyTask";
    /**
     * "No Chart Data" illustration type.
     * @public
     */
    IllustrationMessageType["NoChartData"] = "NoChartData";
    /**
     * "No Filter Results" illustration type.
     * @public
     */
    IllustrationMessageType["NoFilterResults"] = "NoFilterResults";
    /**
     * "Page Not Found" illustration type.
     * @public
     */
    IllustrationMessageType["PageNotFound"] = "PageNotFound";
    /**
     * "Reload Screen" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use UnableToLoad instead.
     */
    IllustrationMessageType["ReloadScreen"] = "ReloadScreen";
    /**
     * "Resize Column" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use ResizingColumns instead.
     */
    IllustrationMessageType["ResizeColumn"] = "ResizeColumn";
    /**
     * "Resizing Columns" illustration type.
     * @public
     */
    IllustrationMessageType["ResizingColumns"] = "ResizingColumns";
    /**
     * "Receive Appreciation" illustration type.
     * @public
     */
    IllustrationMessageType["ReceiveAppreciation"] = "ReceiveAppreciation";
    /**
     * "Search Earth" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use BeforeSearch instead.
     */
    IllustrationMessageType["SearchEarth"] = "SearchEarth";
    /**
     * "Search Folder" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoSearchResults instead.
     */
    IllustrationMessageType["SearchFolder"] = "SearchFolder";
    /**
     * "Sign Out" illustration type.
     * @public
     */
    IllustrationMessageType["SignOut"] = "SignOut";
    /**
     * "Simple Balloon" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use ReceiveAppreciation instead.
     */
    IllustrationMessageType["SimpleBalloon"] = "SimpleBalloon";
    /**
     * "Simple Bell" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoNotifications instead.
     */
    IllustrationMessageType["SimpleBell"] = "SimpleBell";
    /**
     * "Simple Calendar" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoActivities instead.
     */
    IllustrationMessageType["SimpleCalendar"] = "SimpleCalendar";
    /**
     * "Simple CheckMark" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use KeyTask instead.
     */
    IllustrationMessageType["SimpleCheckMark"] = "SimpleCheckMark";
    /**
     * "Simple Connection" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use UnableToLoad instead.
     */
    IllustrationMessageType["SimpleConnection"] = "SimpleConnection";
    /**
     * "Simple Empty Doc" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoData instead.
     */
    IllustrationMessageType["SimpleEmptyDoc"] = "SimpleEmptyDoc";
    /**
     * "Simple Empty List" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoEntries instead.
     */
    IllustrationMessageType["SimpleEmptyList"] = "SimpleEmptyList";
    /**
     * "Simple Error" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use UnableToUpload instead.
     */
    IllustrationMessageType["SimpleError"] = "SimpleError";
    /**
     * "Simple Magnifier" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use BeforeSearch instead.
     */
    IllustrationMessageType["SimpleMagnifier"] = "SimpleMagnifier";
    /**
     * "Simple Mail" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoMail instead.
     */
    IllustrationMessageType["SimpleMail"] = "SimpleMail";
    /**
     * "Simple No Saved Items" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoSavedItems instead.
     */
    IllustrationMessageType["SimpleNoSavedItems"] = "SimpleNoSavedItems";
    /**
     * "Simple Not Found Magnifier" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoSearchResults instead.
     */
    IllustrationMessageType["SimpleNotFoundMagnifier"] = "SimpleNotFoundMagnifier";
    /**
     * "Simple Reload" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use UnableToLoad instead.
     */
    IllustrationMessageType["SimpleReload"] = "SimpleReload";
    /**
     * "Simple Task" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoTasks instead.
     */
    IllustrationMessageType["SimpleTask"] = "SimpleTask";
    /**
     * "Sleeping Bell" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoNotifications instead.
     */
    IllustrationMessageType["SleepingBell"] = "SleepingBell";
    /**
     * "Sort Column" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use SortingColumns instead.
     */
    IllustrationMessageType["SortColumn"] = "SortColumn";
    /**
     * "Sorting Columns" illustration type.
     * @public
     */
    IllustrationMessageType["SortingColumns"] = "SortingColumns";
    /**
     * "Success Balloon" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use ReceiveAppreciation instead.
     */
    IllustrationMessageType["SuccessBalloon"] = "SuccessBalloon";
    /**
     * "Success CheckMark" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use KeyTask instead.
     */
    IllustrationMessageType["SuccessCheckMark"] = "SuccessCheckMark";
    /**
     * "Success HighFive" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use ReceiveAppreciation instead.
     */
    IllustrationMessageType["SuccessHighFive"] = "SuccessHighFive";
    /**
     * "Success Screen" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use KeyTask instead.
     */
    IllustrationMessageType["SuccessScreen"] = "SuccessScreen";
    /**
     * "Survey" illustration type.
     * @public
     */
    IllustrationMessageType["Survey"] = "Survey";
    /**
     * "Tent" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use NoData instead.
     */
    IllustrationMessageType["Tent"] = "Tent";
    /**
     * "Upload Collection" illustration type.
     * @public
     * @deprecated Deprecated as of version 2.11.0, use DragFilesToUpload instead.
     */
    IllustrationMessageType["UploadCollection"] = "UploadCollection";
    /**
     * "User Has Signed Up" illustration type.
     * @public
     */
    IllustrationMessageType["UserHasSignedUp"] = "UserHasSignedUp";
    /**
    * "TntAvatar" illustration type.
    * @public
    */
    IllustrationMessageType["TntAvatar"] = "TntAvatar";
    /**
    * "TntCalculator" illustration type.
    * @public
    */
    IllustrationMessageType["TntCalculator"] = "TntCalculator";
    /**
    * "TntChartArea" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartArea"] = "TntChartArea";
    /**
    * "TntChartArea2" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartArea2"] = "TntChartArea2";
    /**
    * "TntChartBar" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartBar"] = "TntChartBar";
    /**
    * "TntChartBPMNFlow" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartBPMNFlow"] = "TntChartBPMNFlow";
    /**
    * "TntChartBullet" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartBullet"] = "TntChartBullet";
    /**
    * "TntChartDoughnut" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartDoughnut"] = "TntChartDoughnut";
    /**
    * "TntChartFlow" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartFlow"] = "TntChartFlow";
    /**
    * "TntChartGantt" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartGantt"] = "TntChartGantt";
    /**
    * "TntChartOrg" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartOrg"] = "TntChartOrg";
    /**
    * "TntChartPie" illustration type.
    * @public
    */
    IllustrationMessageType["TntChartPie"] = "TntChartPie";
    /**
    * "TntCodePlaceholder" illustration type.
    * @public
    */
    IllustrationMessageType["TntCodePlaceholder"] = "TntCodePlaceholder";
    /**
    * "TntCompany" illustration type.
    * @public
    */
    IllustrationMessageType["TntCompany"] = "TntCompany";
    /**
    * "TntCompass" illustration type.
    * @public
    */
    IllustrationMessageType["TntCompass"] = "TntCompass";
    /**
    * "TntComponents" illustration type.
    * @public
    */
    IllustrationMessageType["TntComponents"] = "TntComponents";
    /**
    * "TntDialog" illustration type.
    * @public
    */
    IllustrationMessageType["TntDialog"] = "TntDialog";
    /**
    * "TntEmptyContentPane" illustration type.
    * @public
    */
    IllustrationMessageType["TntEmptyContentPane"] = "TntEmptyContentPane";
    /**
    * "TntExternalLink" illustration type.
    * @public
    */
    IllustrationMessageType["TntExternalLink"] = "TntExternalLink";
    /**
    * "TntFaceID" illustration type.
    * @public
    */
    IllustrationMessageType["TntFaceID"] = "TntFaceID";
    /**
    * "TntFingerprint" illustration type.
    * @public
    */
    IllustrationMessageType["TntFingerprint"] = "TntFingerprint";
    /**
    * "TntHandshake" illustration type.
    * @public
    */
    IllustrationMessageType["TntHandshake"] = "TntHandshake";
    /**
    * "TntHelp" illustration type.
    * @public
    */
    IllustrationMessageType["TntHelp"] = "TntHelp";
    /**
    * "TntLock" illustration type.
    * @public
    */
    IllustrationMessageType["TntLock"] = "TntLock";
    /**
    * "TntMission" illustration type.
    * @public
    */
    IllustrationMessageType["TntMission"] = "TntMission";
    /**
    * "TntMissionFailed" illustration type.
    * @public
    */
    IllustrationMessageType["TntMissionFailed"] = "TntMissionFailed";
    /**
    * "TntNoApplications" illustration type.
    * @public
    */
    IllustrationMessageType["TntNoApplications"] = "TntNoApplications";
    /**
    * "TntNoFlows" illustration type.
    * @public
    */
    IllustrationMessageType["TntNoFlows"] = "TntNoFlows";
    /**
    * "TntNoUsers" illustration type.
    * @public
    */
    IllustrationMessageType["TntNoUsers"] = "TntNoUsers";
    /**
    * "TntRadar" illustration type.
    * @public
    */
    IllustrationMessageType["TntRadar"] = "TntRadar";
    /**
    * "TntRoadMap" illustration type.
    * @public
    */
    IllustrationMessageType["TntRoadMap"] = "TntRoadMap";
    /**
    * "TntSecrets" illustration type.
    * @public
    */
    IllustrationMessageType["TntSecrets"] = "TntSecrets";
    /**
    * "TntServices" illustration type.
    * @public
    */
    IllustrationMessageType["TntServices"] = "TntServices";
    /**
    * "TntSessionExpired" illustration type.
    * @public
    */
    IllustrationMessageType["TntSessionExpired"] = "TntSessionExpired";
    /**
    * "TntSessionExpiring" illustration type.
    * @public
    */
    IllustrationMessageType["TntSessionExpiring"] = "TntSessionExpiring";
    /**
    * "TntSettings" illustration type.
    * @public
    */
    IllustrationMessageType["TntSettings"] = "TntSettings";
    /**
    * "TntSuccess" illustration type.
    * @public
    */
    IllustrationMessageType["TntSuccess"] = "TntSuccess";
    /**
    * "TntSuccessfulAuth" illustration type.
    * @public
    */
    IllustrationMessageType["TntSuccessfulAuth"] = "TntSuccessfulAuth";
    /**
    * "TntSystems" illustration type.
    * @public
    */
    IllustrationMessageType["TntSystems"] = "TntSystems";
    /**
    * "TntTeams" illustration type.
    * @public
    */
    IllustrationMessageType["TntTeams"] = "TntTeams";
    /**
    * "TntTools" illustration type.
    * @public
    */
    IllustrationMessageType["TntTools"] = "TntTools";
    /**
    * "TntTutorials" illustration type.
    * @public
    */
    IllustrationMessageType["TntTutorials"] = "TntTutorials";
    /**
    * "TntUnableToLoad" illustration type.
    * @public
    */
    IllustrationMessageType["TntUnableToLoad"] = "TntUnableToLoad";
    /**
    * "TntUnlock" illustration type.
    * @public
    */
    IllustrationMessageType["TntUnlock"] = "TntUnlock";
    /**
    * "TntUnsuccessfulAuth" illustration type.
    * @public
    */
    IllustrationMessageType["TntUnsuccessfulAuth"] = "TntUnsuccessfulAuth";
    /**
    * "TntUser2" illustration type.
    * @public
    */
    IllustrationMessageType["TntUser2"] = "TntUser2";
})(IllustrationMessageType || (IllustrationMessageType = {}));
export default IllustrationMessageType;
//# sourceMappingURL=IllustrationMessageType.js.map