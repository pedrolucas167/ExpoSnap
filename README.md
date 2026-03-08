# ExpoSnap - Photo Opp

Aplicativo mobile e web desenvolvido com React Native e Expo para captura de fotos com moldura personalizada da marca NEX.lab. O projeto segue a arquitetura MVC (Model-View-Controller) e oferece um fluxo completo: autenticacao, captura de foto com contagem regressiva, preview com moldura e compartilhamento via QR Code.

---

## Indice

- [Visao Geral](#visao-geral)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pre-requisitos](#pre-requisitos)
- [Instalacao](#instalacao)
- [Executando o Projeto](#executando-o-projeto)
- [Telas do Aplicativo](#telas-do-aplicativo)
- [Componentes Reutilizaveis](#componentes-reutilizaveis)
- [Models](#models)
- [Controllers](#controllers)
- [Navegacao](#navegacao)
- [Configuracoes e Tema](#configuracoes-e-tema)

---

## Visao Geral

O ExpoSnap (Photo Opp) e uma aplicacao que permite aos usuarios fazer login, capturar fotos utilizando a camera frontal do dispositivo, visualizar a foto com uma moldura personalizada e compartilhar o resultado por meio de um QR Code de download.

O projeto foi construido com foco em responsividade, funcionando tanto em dispositivos moveis (Android/iOS) quanto na web.

---

## Funcionalidades

- Tela de login com validacao de email e senha
- Opcao "Lembrar" credenciais e link "Esqueci minha senha"
- Tela inicial com branding da marca (Photo Opp)
- Captura de foto com camera frontal e contagem regressiva de 3 segundos
- Preview da foto capturada com moldura contendo logo e tagline
- Geracao de QR Code para download da foto
- Modal de agradecimento ao finalizar o fluxo
- Layout responsivo com largura maxima para web (max 400px)
- Navegacao com animacao slide entre telas
- Suporte a Android, iOS e Web

---

## Arquitetura

O projeto segue o padrao **MVC (Model-View-Controller)**:

```
Model       --> Define as estruturas de dados (User, Photo, estados)
View        --> Telas (screens) e componentes visuais reutilizaveis
Controller  --> Logica de negocio via custom hooks (useAuthController, usePhotoController)
```

Essa separacao garante que a logica de negocio fique isolada da camada de apresentacao, facilitando testes e manutencao.

---

## Estrutura de Pastas

```
ExpoSnap/
  App.tsx                          # Componente raiz (SafeAreaProvider + Navigator)
  index.ts                         # Ponto de entrada (registerRootComponent)
  app.json                         # Configuracao do Expo
  package.json                     # Dependencias e scripts
  tsconfig.json                    # Configuracao do TypeScript
  assets/                          # Icones e imagens do app
  src/
    assets/                        # Assets internos do projeto
    controllers/
      index.ts                     # Barrel export dos controllers
      AuthController.ts            # Hook useAuthController (login, logout)
      PhotoController.ts           # Hook usePhotoController (captura, countdown, QR)
    models/
      index.ts                     # Barrel export dos models
      UserModel.ts                 # Interfaces User, AuthState
      PhotoModel.ts                # Interfaces Photo, PhotoState
    navigation/
      index.ts                     # Barrel export da navegacao
      AppNavigator.tsx             # Stack Navigator (Login > Home > Camera > Preview > Finish)
    utils/
      theme.ts                     # Cores, fontes, tamanhos, branding
      types.ts                     # RootStackParamList (tipagem das rotas)
    views/
      components/
        index.ts                   # Barrel export dos componentes
        BrandHeader.tsx            # Header com logo e tagline
        Logo.tsx                   # Componente do logo NEX.lab
        PhotoFrame.tsx             # Moldura da foto com logo e tagline
        PrimaryButton.tsx          # Botao reutilizavel (primary, secondary, outline)
      screens/
        index.ts                   # Barrel export das telas
        LoginScreen.tsx            # Tela de login
        HomeScreen.tsx             # Tela inicial (Photo Opp)
        CameraScreen.tsx           # Tela da camera com countdown
        PreviewScreen.tsx          # Preview da foto com moldura
        FinishScreen.tsx           # QR Code + modal de agradecimento
```

---

## Tecnologias Utilizadas

| Tecnologia | Versao | Descricao |
|---|---|---|
| React Native | 0.83.2 | Framework mobile multiplataforma |
| Expo | ~55.0.5 | Plataforma de desenvolvimento React Native |
| TypeScript | ~5.9.2 | Tipagem estatica para JavaScript |
| React Navigation | ^7.1.33 | Navegacao entre telas (Native Stack) |
| Expo Camera | ~55.0.9 | Acesso a camera do dispositivo |
| Expo File System | ~55.0.10 | Manipulacao de arquivos |
| Expo Image Manipulator | ~55.0.9 | Processamento de imagens |
| Expo Media Library | ~55.0.9 | Acesso a galeria de midia |
| React Native QRCode SVG | ^6.3.21 | Geracao de QR Codes |
| React Native SVG | 15.15.3 | Renderizacao de SVG |
| React Native Web | ^0.21.0 | Suporte a web |
| Expo Vector Icons | ^15.0.2 | Icones (Ionicons) |

---

## Pre-requisitos

- Node.js (versao 18 ou superior)
- npm ou yarn
- Expo CLI (instalado globalmente ou via npx)
- Para testes em dispositivo fisico: aplicativo Expo Go (Android/iOS)
- Para emulador Android: Android Studio com AVD configurado
- Para simulador iOS: Xcode (apenas macOS)

---

## Instalacao

1. Clone o repositorio:

```bash
git clone <url-do-repositorio>
cd ExpoSnap
```

2. Instale as dependencias:

```bash
npm install
```

---

## Executando o Projeto

### Servidor de desenvolvimento

```bash
npx expo start
```

### Plataformas especificas

```bash
# Web
npm run web

# Android (emulador ou dispositivo)
npm run android

# iOS (apenas macOS)
npm run ios
```

### Expo Go (dispositivo fisico)

1. Execute `npx expo start`
2. Escaneie o QR Code exibido no terminal com o app Expo Go
3. O aplicativo sera carregado no dispositivo

---

## Telas do Aplicativo

### 1. LoginScreen

Tela de autenticacao com campos de email e senha (inputs com fundo preto e texto branco). Possui checkbox "Lembrar" e link "Esqueci minha senha". A validacao exige formato de email valido e senha com no minimo 4 caracteres. Ao autenticar com sucesso, navega para a tela Home.

### 2. HomeScreen

Tela inicial com o logo NEX.lab no topo e o titulo "Photo Opp" em destaque centralizado. Botao "Iniciar" na parte inferior direciona para a camera.

### 3. CameraScreen

Utiliza a camera frontal do dispositivo. Ao pressionar o botao de captura, inicia uma contagem regressiva de 3 segundos exibida sobre a imagem da camera. Apos a contagem, a foto e capturada automaticamente e o usuario e direcionado para o preview. Se a permissao da camera nao for concedida, exibe uma tela solicitando acesso.

### 4. PreviewScreen

Exibe a foto capturada dentro de uma moldura (PhotoFrame) com o logo NEX.lab e a tagline da marca. O usuario pode "Refazer" (voltar para a camera) ou "Continuar" para a tela final.

### 5. FinishScreen

Exibe um preview reduzido da foto, um QR Code para download e a tagline da marca. O botao "Finalizar" abre um modal de agradecimento com o logo, mensagem e outro QR Code. Ao fechar o modal, o fluxo retorna para a tela Home.

---

## Componentes Reutilizaveis

### Logo

Renderiza o logotipo "NEX.lab" com o texto "NEX" dentro de uma caixa com borda. Aceita propriedades `size` ("small", "medium", "large") e `color`.

### BrandHeader

Header horizontal com o logo e a tagline da marca. Utilizado no topo de telas como a FinishScreen.

### PrimaryButton

Botao reutilizavel com tres variantes: `primary` (fundo cinza escuro), `secondary` (fundo cinza medio) e `outline` (transparente com borda). Suporta estados `disabled` e `loading` (exibe ActivityIndicator). Propriedade `fullWidth` controla se o botao ocupa toda a largura disponivel.

### PhotoFrame

Moldura para exibicao de fotos. Possui header com logo e tagline, a foto centralizada e footer com tagline. Fundo preto com bordas arredondadas. Responsivo com largura maxima de 360px.

---

## Models

### UserModel

Define a interface `User` (email, password, rememberMe) e `AuthState` (isAuthenticated, user, isLoading, error) com estado inicial `initialAuthState`.

### PhotoModel

Define a interface `Photo` (uri, width, height, timestamp) e `PhotoState` (currentPhoto, isCapturing, countdown, isProcessing, framedPhotoUri, qrCodeUrl) com estado inicial `initialPhotoState`.

---

## Controllers

### useAuthController

Custom hook que gerencia a autenticacao. Expoe:

- `authState` - Estado atual da autenticacao
- `login(email, password, rememberMe)` - Valida credenciais e autentica o usuario
- `logout()` - Reseta o estado de autenticacao
- `clearError()` - Limpa mensagens de erro

A validacao inclui verificacao de formato de email (regex) e tamanho minimo de senha (4 caracteres). Simula um delay de 1.5 segundos para representar uma chamada de API.

### usePhotoController

Custom hook que gerencia a captura de fotos. Expoe:

- `photoState` - Estado atual da foto
- `startCountdown(cameraRef, onTick)` - Inicia contagem regressiva e captura a foto
- `cancelCountdown()` - Cancela a contagem em andamento
- `resetPhoto()` - Reseta o estado da foto
- `setFramedPhoto(uri)` - Define a URI da foto com moldura
- `generateDownloadUrl(photoUri)` - Gera URL de download (simulada)
- `setProcessing(bool)` - Define estado de processamento

---

## Navegacao

A navegacao utiliza React Navigation com Native Stack Navigator. O fluxo completo e:

```
Login --> Home --> Camera --> Preview --> Finish --> (volta para Home)
```

Configuracoes:
- Header desabilitado em todas as telas
- Animacao slide_from_right entre transicoes
- Gesto de voltar desabilitado nas telas Login e Home
- Gesto de voltar habilitado nas demais telas

---

## Configuracoes e Tema

O arquivo `theme.ts` centraliza todas as constantes visuais:

- **COLORS**: Paleta de cores (preto, branco, cinzas, cores de input, botoes, overlay)
- **FONTS**: Familia de fontes (System)
- **SIZES**: Tamanhos padronizados (xs a huge, padding, margin, borderRadius)
- **BRANDING**: Nome da empresa ("NEX.lab"), tagline ("we make tech simple_"), nome do app ("Photo Opp")

O arquivo `types.ts` define o `RootStackParamList` com a tipagem de parametros de cada rota, garantindo type-safety na navegacao.
