import styled from 'styled-components';
export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SocialSection = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 50px;
  justify-content: space-between;
`;
export const SocialButton = styled.TouchableOpacity`
  width: 250px;
  height: 50px;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-color: rgba(171, 180, 189, 0.65);
  border-width: 1px;
  box-shadow: 10px 10px 5px #aaaaaa;
`;
export const SocialIcon = styled.Image`
  width: 26px;
  height: 26px;
`;
export const SocialText = styled.Text`
  font-size: 16px;
  color: black;
`;

export const EmailSection = styled.View`
width:100%
padding:10px;

`;

export const Input = styled.TextInput`
  width: 100%;
  border-bottom-width: 1px;
  margin-top: 40px;
`;

export const FormButton = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  background-color: #0984e3;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const FormLabel = styled.Text`
  color: #0984e3;
  font-size: 14px;
  margin-top: 20px;
  align-self: flex-end;
`;

export const FormButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
export const FormLinkLabel = styled.TouchableOpacity`
  width: 100%;
  hei
  flex-direction: row;
`;
