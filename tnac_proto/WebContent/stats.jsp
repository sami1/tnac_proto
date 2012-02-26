<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TNAC Octobre 2011</title>
<link
	href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css"
	rel="stylesheet" type="text/css" />
<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script
	src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
        <link href="kendo/styles/kendo.common.min.css" rel="stylesheet"/>
        <link href="kendo/styles/kendo.default.min.css" rel="stylesheet"/>
        <script src="kendo/js/kendo.core.min.js"></script>
        <script src="kendo/js/kendo.treeview.min.js"></script>
<script type="text/javascript" src="js/tnacTreeStats.js"></script>
<link rel="stylesheet" href="css/screen.css" type="text/css" />

<script src="js/highcharts.js" type="text/javascript"></script>
<script src="js/themes/grid.js" type="text/javascript"></script>

</head>
<body>
	<div id="header">
		<h1 align="center">TNAC Octobre 2011 Election Data.
	</div>

	<div class="colmask leftmenu">
		<div class="colleft">
			<div class="col1">
				<!-- Column 1 start -->
				<div id="mainView"></div> 
			</div>
			<div class="col2" style="overflow: auto;height:840px">
				<ul id="tnacTree" class="filetree">
				<%=request.getServletContext().getAttribute("tree") %>
				</ul>
			</div>
		</div>
	</div>
	<div align="center"  id="footer">OpenGovTN 2011</div>

</body>
</html>