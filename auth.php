<?php
$servername = "localhost";
$username = "root";
$password = "CET@5129x";
$dbname = "user_auth";

$conn = new mysqli('localhost', 'root', 'CET@5129x', 'user_auth');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if ($data['action'] === 'login') {
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }
    $stmt->close();
}

   elseif ($data['action'] === 'signup') {
        $username = $data['username'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash the password
    
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $password);
    
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Signup failed.']);
        }
        $stmt->close();
    }


$conn->close();
?>