# @router.post("/detect")
# async def experiment(file: UploadFile = File(...)):
#     file_contents = await file.read()
#     content_type = file.content_type
#     return StreamingResponse(io.BytesIO(file_contents), media_type=content_type)


# @router.post("/detect")
# async def experiment2(file: UploadFile = File(...)):
#     file_contents = await file.read()
#     image = Image.open(io.BytesIO(file_contents))
#     image = image.convert("L")
#     output_buffer = io.BytesIO()
#     image.save(output_buffer, format="JPEG")
#     output_buffer.seek(0)
#     return StreamingResponse(output_buffer, media_type="image/jpeg")


# @router.post("/detect")
# async def experiment3(file: UploadFile = File(...)):
#     file_contents = await file.read()
#     nparr = np.frombuffer(file_contents, np.uint8)
#     image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#     gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     _, buffer = cv2.imencode('.jpg', gray_image)
#     io_buf = io.BytesIO(buffer.tobytes())
#     return StreamingResponse(io_buf, media_type="image/jpeg")