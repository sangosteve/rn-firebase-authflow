import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #f8f8f8;
`;

export const Card = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #aab8c2;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding-left: 10px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const UserInfoText = styled.View`
  flex-direction: column;
  justify-content: center;
`;

export const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const PostTime = styled.Text`
  font-size: 16px;
  color: #aab8c2;
`;

export const PostText = styled.Text`
  font-size: 16px;
  color: #14171a;
`;

export const PostImg = styled.Image`
  width: 100%;
  height: 250px;
  margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
`;

export const Interaction = styled.TouchableOpacity`
flex-direction:row
justify-content:center;
border-radius:5px;
margin-right:20px;
background-color:${props => (props.active ? '#2e64e515' : 'transparent')}
`;
export const InteractionText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${props => (props.active ? '#2e64e5' : '#333')};
  margin-top: 5px;
  margin-left: 5px;
`;
export const Divider = styled.View`
  border-bottom-color: #dddddd;
  border-bottom-width: 1px;
  width: 100%;
  height: 10px;
  align-self: center;
  margin-top: 15px;
`;
