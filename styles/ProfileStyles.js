import styled from 'styled-components';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 10px;
`;
export const HeaderWrapper = styled.View`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
`;
export const UserNameWrapper = styled.View`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const UserNameText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
export const UserStatusText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #acaeae;
`;

export const InteractionWrapper = styled.View`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const EditButton = styled.TouchableOpacity`
  align-self: flex-end;
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
  height: 60px;
  margin-top: 35px;
  flex-direction: row;
  justify-content: space-between;
`;

export const PostStats = styled.View`
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;
export const PostStatsText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
export const PostStatsCount = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #acaeae;
`;

export const FollowersStats = styled.View`
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const FollowersStatsCount = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #acaeae;
`;

export const FollowersStatsText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const FollowingStats = styled.View`
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

export const FollowingStatsCount = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #acaeae;
`;
export const FollowingStatsText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
