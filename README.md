1. 단어와 해당 단어와 유사한 단어들의 정보를 받는다. 
이때 유사한 단어들에게는 각자 similarity가 할당되어있음
2. 한 게임에서 플레이어가 guessing을 할 때마다, 상금이 추가됨.
3. guessing한 단어와 그 단어와 정답 단어의 유사도는 전체 공개됨.

정답 단어 apple일 경우

player 1 - block - 1.039 % - far 
player 2 - chain - 0.405 % - far 
player 3 - fruit - 38.49 % - 100/1000
player 1 - pineapple - 78.39 % - 7/1000

이런식으로 모두 공개되게끔 실시간 게임으로 만들 예정
4. 프론트에 player가 guessing을 하고 정답 단어와 맞는지 여부는 contract에서 확인할 것.
5. ca에 참여금을 예치하고, 정답자가 나올경우 contract에서 상금을 정답 맞춘 사람에게 넘기게 됨. 