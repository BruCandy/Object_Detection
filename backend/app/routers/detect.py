from fastapi import APIRouter, File, UploadFile
from fastapi.responses import StreamingResponse
from models.ssd_predictions import SSDPredictions
from models.ssd import SSD
import torch
import io
import cv2
import numpy as np


router = APIRouter()

voc_classes = ["kamukamu","tsubu"]

ssd_cfg = {
    'classes_num': 21,  # 背景クラスを含めた合計クラス数
    'input_size': 300,  # 画像の入力サイズ
    'dbox_num': [4, 6, 6, 6, 4, 4],  # 出力するDBoxのアスペクト比の種類
    'feature_maps': [38, 19, 10, 5, 3, 1],  # 各sourceの画像サイズ
    'steps': [8, 16, 32, 64, 100, 300],  # DBOXの大きさを決める
    'min_sizes': [30, 60, 111, 162, 213, 264],  # DBOXの大きさを決める
    'max_sizes': [60, 111, 162, 213, 264, 315],  # DBOXの大きさを決める
    'aspect_ratios': [[2], [2, 3], [2, 3], [2, 3], [2], [2]],
}

net = SSD(phase="test", cfg=ssd_cfg)
net_weights = torch.load(
    'models/グミ_weights_train.pth',
    map_location={'cuda:0': 'cpu'})

net.load_state_dict(net_weights)

ssd = SSDPredictions(eval_categories=voc_classes, net=net)

@router.post("/detect")
async def detect_objects(file: UploadFile = File(...)):
    image_bytes = await file.read()
    nparr = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    rgb_img, predict_bbox, pre_dict_label_index, scores = ssd.ssd_predict(image, confidence_threshold=0.8)

    drawn_image = ssd.draw_on_image(rgb_img, predict_bbox, pre_dict_label_index, scores, voc_classes)

    _, buffer = cv2.imencode('.jpg', drawn_image)
    io_buf = io.BytesIO(buffer.tobytes())

    return StreamingResponse(io_buf, media_type="image/jpeg")