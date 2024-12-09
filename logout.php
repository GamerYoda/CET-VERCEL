<?php
header("Location: /index.html");
session_start();
session_destroy();
header("Location: index.html"); // Redirect to the main site
exit();