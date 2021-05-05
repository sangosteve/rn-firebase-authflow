import styled from 'styled-components';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #1da1f2;
  position: relative;
`;
export const ContentWrapper = styled.View`
  width: 100%;
  height: 75%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;
export const HeaderWrapper = styled.View`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  position: relative;
`;
export const UserNameWrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
  align-self: center;
`;

export const UserImage = styled.Image`
  position: absolute;
  z-index: 100;
  top: -45%;
  align-self: center;
  width: 120px;
  height: 120px;
  border-radius: 100px;
  border-color: #fff;
  border-width: 5px;
`;

export const UserNameText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 40%;
  color: #657786;
`;
export const UserStatusText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #acaeae;
`;

export const InteractionWrapper = styled.View`
  display: flex;
  align-items: flex-start;
  align-self: flex-end;
  justify-content: space-between;
  border-color: grey;
  z-index: 1000;
  padding: 20px;
`;

export const EditButton = styled.TouchableOpacity`
  align-self: center;
  z-index: 1000;
`;

export const InteractionButtonsWrapper = styled.View`
  display: flex;
  align-self: flex-end;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const MessageButton = styled.TouchableOpacity`
  align-self: center;
`;
export const FollowButton = styled.TouchableOpacity`
  width: 80px;
  height: 28px;
  background-color: #39c4ff;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  align-self: center;
  margin-left: 10px;
`;
export const FollowButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const UserStatsWrapper = styled.View`
  width: 100%;
  height: 100px;
  margin-top: 35px;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  position: absolute;
  top: 10%;
  z-index: 1000;
`;

export const PostStats = styled.View`
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;
export const PostStatsText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #657786;
`;
export const PostStatsCount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #acaeae;
`;

export const FollowersStats = styled.View`
  height: 100%;
  justify-content: space-around;
  align-items: center;
  color: #657786;
`;

export const FollowersStatsCount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #acaeae;
`;

export const FollowersStatsText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #657786;
`;

export const FollowingStats = styled.View`
  height: 100%;
  justify-content: space-around;
  align-items: center;
  color: #657786;
`;

export const FollowingStatsCount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #acaeae;
`;
export const FollowingStatsText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #657786;
`;

export const UserPostsWrapper = styled.View`
  width: 100%;
  margin-top: 70px;
  min-height: 100%;
`;
