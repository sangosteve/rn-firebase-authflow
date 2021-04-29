import styled from 'styled-components';
export const Container = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;

export const UserImageWrapper = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  border: solid 1px red;
`;

export const UserImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;
export const InputWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
  width: 100%;
  position: relative;
  margin-top: 18px;
`;

export const InputField = styled.TextInput`
  width: 100%;
  border: solid 1px #acaeae;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  margin-top: 10px;
`;
