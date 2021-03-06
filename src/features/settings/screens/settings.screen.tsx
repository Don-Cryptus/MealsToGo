import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, List } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { RootStackParamList } from "../../../infrastructure/navigation/settings.navigator";
import { theme } from "../../../infrastructure/theme";
import {
  AuthenticationContext,
  UserProps,
} from "../../../services/authentication/authentication.context";
import * as S from "./settings.styles";

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Settings"
>;

type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProp;
};

export const SettingsScreen = ({
  navigation,
}: SettingsScreenProps): JSX.Element => {
  const { user, onLogout } = useContext(AuthenticationContext);
  const [photo, setPhoto] = useState("");

  const getProfilePicture = async (currentUser: UserProps) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    if (photoUri) {
      setPhoto(photoUri);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user])
  );

  return (
    <S.SettingsBackground>
      <S.TransparentSafeArea>
        <S.AvatarContainer>
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            {!photo && (
              <Avatar.Icon
                size={180}
                icon="human"
                style={{ backgroundColor: theme.colors.brand.primary }}
              />
            )}
            {!!photo && (
              <Avatar.Image
                size={180}
                source={{ uri: photo }}
                style={{ backgroundColor: theme.colors.brand.primary }}
              />
            )}
          </TouchableOpacity>
          <Spacer position="top" size="large">
            <Text variant="label">{user.email}</Text>
          </Spacer>
        </S.AvatarContainer>

        <List.Section>
          <S.SettingsItem
            title="Favourites"
            description="View your favourites"
            left={(props) => (
              <List.Icon
                {...props}
                color={theme.colors.ui.error}
                icon="heart"
              />
            )}
            onPress={() => navigation.navigate("Favourites")}
          />
          <S.SettingsItem
            title="Payment"
            left={(props) => (
              <List.Icon
                {...props}
                color={theme.colors.ui.secondary}
                icon="cart"
              />
            )}
            onPress={() => null}
          />
          <S.SettingsItem
            title="Past Orders"
            left={(props) => (
              <List.Icon
                {...props}
                color={theme.colors.ui.secondary}
                icon="history"
              />
            )}
            onPress={() => null}
          />
          <S.SettingsItem
            title="Logout"
            left={(props) => (
              <List.Icon
                {...props}
                color={theme.colors.ui.secondary}
                icon="door"
              />
            )}
            onPress={onLogout}
          />
        </List.Section>
      </S.TransparentSafeArea>
    </S.SettingsBackground>
  );
};
