import cv2
import os
from ultralytics import YOLO

# Load the YOLO model
model = YOLO("yolov8n.pt")

# Make sure the save directory exists
os.makedirs("C:/TrackSmartData", exist_ok=True)

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)
    annotated_frame = results[0].plot()

    # Save the annotated frame
    cv2.imwrite("C:/TrackSmartData/latest_frame.jpg", annotated_frame)

    # Resize the preview for display only (not saved)
    preview = cv2.resize(annotated_frame, (992, 492))

    # Show preview window
    cv2.imshow("YOLO Feed", annotated_frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()


