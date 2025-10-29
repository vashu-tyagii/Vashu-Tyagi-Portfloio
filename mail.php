<?php
// Include PHPMailer files
// NOTE: These files (PHPMailer.php, SMTP.php, Exception.php) must be in the same directory as this script, or in a directory accessible via include_path.
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. INPUT VALIDATION: Check for required POST data
if (empty($_POST['contact_name']) || empty($_POST['contact_email']) || empty($_POST['contact_subject']) || empty($_POST['contact_message'])) {
    // Bad Request: Missing fields
    http_response_code(400); 
    // Do NOT show the full PHP error, just a simple message
    die("Error: Please fill out all required fields and try again.");
}

// 2. RETRIEVE AND SANITIZE DATA using the names set in index.html
$name = htmlspecialchars($_POST['contact_name']);
$email = filter_var($_POST['contact_email'], FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars($_POST['contact_subject']);
$message = htmlspecialchars($_POST['contact_message']);

// Final email composition
$final_subject = "NEW PORTFOLIO INQUIRY: " . $subject;
$body = "
    <h2 style='color: #2a3749;'>New Contact Form Submission</h2>
    <hr style='border: 1px solid #e4a109;'>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Reply-To Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
    <p><strong>Inquiry Subject:</strong> {$subject}</p>
    <hr style='border: 1px solid #e4a109;'>
    <h3>Message:</h3>
    <div style='padding: 15px; border: 1px solid #ddd; background-color: #f9f9f9; white-space: pre-wrap;'>{$message}</div>
";

$mail = new PHPMailer(true); // Enable exceptions

try {
    // Server settings
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;

    // SMTP Host and Credentials (KEPT UNCHANGED AS REQUESTED)
    $mail->Host       = 'smtp.gmail.com';
    $mail->Username   = 'vashutyagi0011@gmail.com'; 
    $mail->Password   = 'kacl vchy cxnu vegg';        
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;

    // Recipients
    // Set the user's email as the Reply-To address
    $mail->setFrom('vashutyagi0011@gmail.com', 'Portfolio Form');
    $mail->addAddress('vashutyagi0011@gmail.com');
    $mail->addReplyTo($email, $name); 

    // Content
    $mail->isHTML(true);
    $mail->Subject = $final_subject;
    $mail->Body    = $body;
    // Plain text alternative for non-HTML email clients
    $mail->AltBody = "Name: {$name}\nEmail: {$email}\nSubject: {$subject}\n\nMessage:\n{$message}"; 

    $mail->send();
    
    // Success response for the client-side
    http_response_code(200);
    echo "Message sent successfully! Thank you for reaching out.";
    
} catch (Exception $e) {
    // Error response
    http_response_code(500);
    // Log the detailed error internally for debugging
    error_log("Mailer Error ({$email}): " . $mail->ErrorInfo); 
    // Give a simple message to the user
    echo "Failed to send the message. Please ensure your email address is correct and try again.";
}
?>
