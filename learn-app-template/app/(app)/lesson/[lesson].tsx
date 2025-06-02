import LinkButton from "@/components/core/LinkButton";
import Loader from "@/components/core/Loader";
import { IPracticeConfig, useLessons } from "@/context/LessonsContext";
import { getProgressColor, lsKeys, PracticeStat, useStorage } from "@/context/StorageContext";
import { loadEncryptedContent } from "@/lib/decrypt";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import { Circle } from "react-native-progress";

type LessonTheoryProps = {
  lessonId: string
}

type PracticeLink = {
  practiceId: string,
  title: string,
  progress: number, 
  href: any
}

type LinkParams = {
  id: string,
  title: string, 
  isVocabulary: boolean
}

const Tab = createBottomTabNavigator();

export default function LessonPage() {
  const { lesson } = useLocalSearchParams();
  const { getLSItem} = useStorage();
  const { LS_PRACTICE_KEY } = lsKeys;
  const { lessonsById, practiciesById, vocabulariesById} = useLessons();
  const navigation = useNavigation();
  const [ practiceLinks, setPracticeLinks ] = useState<PracticeLink[]>([]);
  const [ vocabulary, setVocabulary ] = useState<{[key: string] : string}>({});

  useEffect(() => {
    const { title, vocabularyId, practiceConfig } = lessonsById[lesson as string];
    setupHeader(title);
    setupPractice(practiceConfig);
    setVocabulary(vocabulariesById[vocabularyId] || {})
  }, [lesson]);

  const makeLink = (id: string, title: string, type: string, progress: number) => {
    return {
        practiceId: id,
        title,
        href: {
          pathname: '/(app)/lesson/practice/[practice]',
          params: {
            practice: id,
            type: type,
          },
        },
        progress
      }
  }

  const setupHeader = (title: string) => {
    navigation.setOptions({
      title,
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        whiteSpace: 'initial',
      },
    });
  }

  const setupPractice = async (practiceConfig: IPracticeConfig) => {
    const links: PracticeLink[] = [];
    const currentStat = await getLSItem<PracticeStat>(LS_PRACTICE_KEY) || {};

    if (practiceConfig.vocabularId) {
      const stat = currentStat[practiceConfig.vocabularId + 'vocabular'] || 0;
      links.push(makeLink(practiceConfig.vocabularId, "Словарь", 'vocabular', stat));
    }
    
    const otherTaskIds = new Set([...practiceConfig.testIds, ...practiceConfig.orderIds, ...practiceConfig.inputIds])
    
    if (otherTaskIds.size) {
      otherTaskIds.forEach(practiceId => {
        const practice = practiciesById[practiceId];

        if (practiceConfig.testIds.includes(practiceId)) {
          const stat = currentStat[practiceId + 'test'] || 0;
          links.push(makeLink(practiceId, `${practiceConfig.orderIds.length && practiceConfig.inputIds.length ? "Уровень 1: " : ""}${practice.title}`, 'test', stat));
        }

        if (practiceConfig.orderIds.includes(practiceId)) {
          const stat = currentStat[practiceId + 'order'] || 0;
          links.push(makeLink(practiceId, `Уровень 2: ${practice.title}`, 'order', stat));
        }

        if (practiceConfig.inputIds.includes(practiceId)) {
          const stat = currentStat[practiceId + 'input'] || 0;
          links.push(makeLink(practiceId, `Уровень 3: ${practice.title}`, 'input', stat));
        }

      })
    }

    setPracticeLinks(links);
  }


  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#999",
          // tabBarLabelPosition: "beside-icon",
          headerShown: false,
          tabBarIconStyle: {
            height: 22
          },
          tabBarStyle: {
            backgroundColor: "#25292e",
            borderColor: "lightgray",
            // borderTopWidth: 
          }
        }}
      >
        <Tab.Screen
          name="theory"
          children={() => <LessonTheory lessonId={lesson as string} />}
          options={{
            title: "Теория",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="book" size={16} color={focused ? "white" : 'darkgray'} />
            ),
          }}
        />

        <Tab.Screen
          name="vocabulary"
          children={() => <LessonVocabulary vocabulary={vocabulary} />}
          options={{
            title: "Словарь",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="retweet" size={18} style={{height: 16}} color={focused ? "white" : 'darkgray'} />
            ),
          }}
        />

        <Tab.Screen
          name="practice"
          children={() => <LessonPractice practicies={practiceLinks} />}
          options={{
            title: "Практика",
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AntDesign name="form" size={16} color={focused ? "white" : 'darkgray'} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

type LessonPracticeProps = {
  practicies: PracticeLink[],
};

function LessonPractice ({ practicies }: LessonPracticeProps) {  
  return (
      <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={[styles.scrollView]}
          nestedScrollEnabled={true}
      >
        <FlatList
          data={practicies}
          style={{width: "100%"}}
          renderItem={({ item }) => (
            <PracticeItem
              {...item}
            />)
          }
          keyExtractor={(item, index) => item.practiceId+index}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </ScrollView>
  );
}

function PracticeItem(props: PracticeLink) {
  
  const { title, href, progress} = props;

  const buttonStyle = StyleSheet.create({
    plainButton: {
      flex: 1,
      transitionDuration: "200ms",
      flexDirection: "row",
      alignItems: 'center',
      paddingLeft: 14,
      paddingRight: 16
    },
    plainButtonHovered: {
      backgroundColor: "rgba(0,0,0,0.1)"
    },
    plainButtonPressed: {
      backgroundColor: "rgba(0,0,0,0.1)"
    },
  });

  const chevronStyle = {
    size: 16,
    color: "#919497"
  };

  return <>
    <LinkButton
      href={href}
      buttonStyle={buttonStyle}
      chevronStyle={chevronStyle}
    >
      <View style={styles.practiceButtonContent}>
        {/* <AntDesign name="loading1" size={24} color="#28a745" />         */}
        <Circle 
          progress={progress} 
          size={45}
          color={getProgressColor(progress)}
          borderColor={progress == 1 ? 'none' : getProgressColor(progress)}
          textStyle={{fontSize: 12, fontWeight: 600, color: getProgressColor(progress)}}
          thickness={3}
          formatText={() => +progress.toFixed(2) * 100 + '%'}
          showsText
        />
        <Text style={styles.practiceButtonText}>{title}</Text>
      </View>
    </LinkButton>
  </>
}

function LessonVocabulary ({vocabulary}: {vocabulary: {[key: string] : string}}) {
  const data = Object.entries(vocabulary).map(([word, translation]) => ({
    key: word,
    word,
    translation: translation
  }));

  const renderItem = ({ item }: { item: { key: string; word: string; translation: string } }) => (
    <View style={vocabularyStyles.row}>
      <Text style={vocabularyStyles.cell}>{item.word}</Text>
      <Text style={vocabularyStyles.cell}>{item.translation}</Text>
    </View>
  );

  return (
    
    <ScrollView 
      contentContainerStyle={vocabularyStyles.container} 
      nestedScrollEnabled={true}
    >
      <View style={[vocabularyStyles.row, vocabularyStyles.headerRow]}>
        <Text style={vocabularyStyles.headerCell}>Слово</Text>
        <Text style={vocabularyStyles.headerCell}>Перевод</Text>
      </View>
      <FlatList data={data} renderItem={renderItem} />
    </ScrollView>
  )
}

// const MD = `
// В современном греческом алфавите имеются 24 буквы. Семь из них - **гласные** (α, ε, η, ι, о, υ, ω) и семьнадцать - **согласные** (β, γ, δ, ζ, θ, κ, λ, μ, ν, ξ, π, ρ, σ, τ, φ, χ, ψ). 

// #### Алфавит
// ##### Α α
// **Название:** альфа
// **Звучит как:** [а]
// **Пример:** ~~ά~~νδρας [~~а́~~ндрас] - мужчина

// ##### Β β  
// **Название:** вита
// **Звучит как:** [в]
// **Пример:** ~~β~~ι~~β~~λίο [~~в~~и~~в~~ли́о] - книга

// ##### Γ γ
// **Название:** гамма
// **Звучит как:** [г] (глухое)
// **Пример:** ~~γ~~άλα [~~г~~а́ла] - молоко

// ##### Δ 
// **Название:** дельта
// **Звучит как:** как *th* в слове *this*, далее в транскрипциях будет обозначаться как ~~[ð]~~
// **Пример:** ~~δ~~ρόμος [~~ð~~ро́мос] - дорога  
  
// ##### Ε ε
// **Название:** эпсилон
// **Звучит как:** [е] или [э]
// **Пример:** ~~έ~~να [~~э́~~на] - один

// ##### Ζ ζ
// **Название:** зита
// **Звучит как:** среднее между звуками [з] и [ж], далее в транскрипциях будет обозначаться как ~~[з]~~
// **Пример:** ~~ζ~~ωή [~~з~~ои́] - жизнь

// ##### Η η
// **Название:** ита
// **Звучит как:** [и]
// **Пример:** ~~ή~~λιος [~~и́~~лиос] - солнце

// ##### Θ θ
// **Название:** фита
// **Звучит как:** как *th* в слове *think*, далее в транскрипциях будет обозначаться как ~~[θ]~~
// **Пример:** ~~θ~~εραπεία [~~θ~~ерапи́а] - терапия  
  
// ##### Ι ι
// **Название:** йота
// **Звучит как:** [и]
// **Пример:** ~~ι~~στορία [~~и~~стори́а] - история

// ##### Κ κ
// **Название:** каппа
// **Звучит как:** [к]
// **Пример:** ~~κ~~αφές [~~к~~афэ́с] - кофе

// ##### Λ λ
// **Название:** лямда
// **Звучит как:** [л]
// **Пример:** ~~λ~~εξικό [~~л~~ексико́] - словарь

// ##### Μ μ
// **Название:** ми
// **Звучит как:** [м]
// **Пример:** ~~μ~~ήλο [~~м~~и́ло] - яблоко

// ##### Ν ν
// **Название:** ни
// **Звучит как:** [н]
// **Пример:** ~~ν~~ησί [~~н~~иси́] - остров

// ##### Ξ ξ
// **Название:** кси
// **Звучит как:** [кс]
// **Пример:** ~~ξ~~ένος [~~кс~~е́нос] - иностранец

// ##### Ο ο
// **Название:** омикрон
// **Звучит как:** [о]
// **Пример:** ~~ό~~νομα [~~о́~~нома] - имя

// ##### Π π
// **Название:** пи
// **Звучит как:** [п]
// **Пример:** ~~π~~ατάτα [~~п~~ата́та] - картофель  

// ##### Ρ ρ  
// **Название:** ро  
// **Звучит как:** [р]  
// **Пример:** ~~ρ~~εφρέν [~~р~~ефре́н] - припев  

// ##### Σ σ, ς  
// **Название:** сигма  
// **Звучит как:** [с]  
// **Пример:** ~~σ~~ήμερα [~~с~~и́мера] - сегодня  

// ##### Τ τ  
// **Название:** тав  
// **Звучит как:** [т]  
// **Пример:** ~~τ~~αξί [~~т~~акси́] - такси  

// ##### Υ υ  
// **Название:** ипсилон  
// **Звучит как:** [и]  
// **Пример:** ~~ύ~~πνος [~~и́~~пнос] - сон  

// ##### Φ φ  
// **Название:** фи  
// **Звучит как:** [ф]  
// **Пример:** ~~φ~~έτα [~~ф~~е́та] - фета  

// ##### Χ χ  
// **Название:** хи  
// **Звучит как:** [х]  
// **Пример:** ~~χ~~αλί [~~х~~али́] - ковер  

// ##### Ψ ψ  
// **Название:** пси  
// **Звучит как:** [пс]  
// **Пример:** ~~ψ~~άρι [~~пс~~а́ри] - рыба  

// ##### Ω ω  
// **Название:** омега  
// **Звучит как:** [о]  
// **Пример:** ~~ω~~φέλεια [~~о~~фе́лиа] - польза  
  
// **! Обратите внимание** - некоторые буквы имеют одинаковое звучание. Так, буквы **η, ι, υ** *(ита, йота, ипсилон)* могут читаться как **[и]**, а буквы **ω** и **ο** *(омега и омикрон)* могут читаться как **[o]**. Однако так бывает не всегда. В греческом языке так же имеются различные буквосочетания, которые звучат по определенным правилам.

// #### **Буквосочетания**
// ##### **Сочетания αι, ει, οι**

// В зависимости от ударения данные сочетания могут менять свое звучание:

// **Сочетания**: αι, αί
// **Звучит как**: [э] или [е]
// **При­меры**:
// > ~~αί~~μα [~~э́~~ма] - кровь  
// > κ~~αι~~ [к~~е~~] - союз "и" 
  
// **Сочетания**: άι, αΐ, αϊ  
// **Звучит как**: [аи] или [ай]  
// **При­меры**: 
// > λ~~άι~~μ [л~~а́й~~м] - лайм
// > φ~~αΐ~~ [ф~~ай~~] - пища
// > λ~~αϊ~~κή [л~~ай~~ки́] - уличный рынок  

// **Сочетания**: ει, εί  
// **Звучит как**: [и]  
// **При­меры**:
// > όν~~ει~~ρο [о́н~~и~~ρο] - сон
// > ~~εί~~ναι [~~и́~~нэ] - быть  

// **Сочетания**: έι, εϊ  
// **Звучит как**: [эй]([ей]) или [эи]([еи])  
// **При­меры**: 
// > κ~~έι~~κ [к~~е́й~~к] - торт
// > τρόλ~~εϊ~~ [тро́л~~ей~~] - тролейбус  

// **Сочетания**: οί, οι  
// **Звучит как**: [и]  
// **При­меры**: 
// > αν~~οί~~γω [ан~~и́~~го] - открывать
// > στ~~οι~~χείο [ст~~и~~хи́о] - элемент  

// **Сочетания**: οϊ, όι  
// **Звучит как**: [ои] или [ой] 
// **При­меры**: 
// > ρολ~~όι~~ [рол~~о́й~~] - часы  
// > πρ~~οϊ~~όν [пр~~ой~~о́н] - товар

// **! Стоит отметить**, что сочетания букв ~~οι~~ и ~~ει~~ могут звучать иначе, если являются частью других, более сложных сочетаний. Данные сочетания описаны ниже.

// ##### **Сочетания για, γεια, γιο, γιω, οιω, οιο, γιου, ου**

// **Сочетания**: για, γεια
// **Звучит как**: [я]  
// **При­меры**:  
// > ~~για~~τρός [~~я~~тро́с] - врач 
// > ~~γειά~~ σας [~~я~~сас] - здравствуйте

// **Сочетания**: γιό, γιώ, οιώ, οιό, οϊό  
// **Звучит как**: [ё] 
// **При­меры**:  
// > ~~γιό~~ς [~~ё~~с] - сын  
// > ~~γιώ~~τα [~~ё~~та] - ёта  
// > ειδοπ~~οιώ~~ [иðопь~~ё~~] - уведомлять  
// > π~~οιό~~τητα [пь~~ё~~тита] - качество  
// > πρ~~οϊό~~ν [про~~ё~~о́н] - продукт    

// **Сочетание**: ου  
// **Звучит как**: [у]  
// **При­меры**:  
// > σ~~ού~~πα [с~~у́~~па] - суп

// **Сочетания**: γιου, ιού
// **Звучит как**: [ю]
// **При­меры**:  
// > ~~γιου~~ρούσι [~~ю~~ру́си] - атака
// > ~~γιου~~βέτσι [~~ю~~ве́ци] - ювéци (блюдо)
// > χερ~~ιού~~ [херь~~ю~~] - ручной  

// **! Стоит отметить**, что сочетания букв ~~ιού~~ смегчает стоящие перед ней согласные звуки (поэтому в транскрипции добавляется мягкий знак)

// ##### **Сочетания αυ, ευ**

// **Сочетания**: αυ + γ, λ, ρ (а так же + β, δ, ζ, μ, гласные)*  
// **Чи­та­ет­ся как**: [ав]  
// **При­меры**:  
// > ~~αυ~~γό [~~ав~~го́] - яйцо  
// > ~~αυ~~λή [~~ав~~ли́] - двор  
// > ~~αύ~~ριο [~~а́в~~рио] - завтра
 
// А так же:
// > ~~Αυ~~δής [~~Ав~~зи́с] - фамилия  
// > ~~Αυ~~ζώτης [~~Ав~~зо́тис] - фамилия  
// > Κα~~υμ~~ενάκης [Кавмена́кис] - фамилия  

// **Сочетания**: αυ + κ, τ, χ, φ, θ, σ, ξ (а так же  + π, φ, ψ)*  
// **Чи­та­ет­ся как**: [аф]  
// **При­меры**:  
// > ν~~αύ~~κληρος [н~~аф~~клирос] - боцман  
// > ν~~αύ~~της [н~~а́ф~~тис] - моряк  
// > ~~αυ~~ξάνω [~~аф~~кса́но] - увеличивать  
// > ~~αυ~~στηρός [~~аф~~стиро́с] - строгий  
// > ~~αυ~~χένας [~~аф~~хе́нас] - шея  
// > ~~αυ~~θόρμητος [~~аф~~θо́рмитос] - спонтанный  

// А так же:
// > Ν~~αύ~~πλιο [Н~~а́ф~~плио] - город  

// **Сочетания**: άυ, αϋ  
// **Чи­та­ет­ся как**: [аи]  
// **При­меры**:  
// > ~~αϋ~~πνία [~~аи~~пни́я] - бессонница  
// > ~~άυ~~πνος [~~а́и~~пнос] - бессонный  

// **Сочетания**: ευ + γ, δ, λ, ρ, μ, ν (а так же + β, ζ, гласные)*  
// **Чи­та­ет­ся как**: [эв]  
// **При­меры**:  
// > ~~ευ~~ρώ [~~ев~~ро́] - евро  
// > ~~ευ~~αίσθητος [~~эв~~есθитос] - чуткий  
// > ~~εύ~~γευστο [~~э́в~~гефсто] - вкусно  
// > ~~ευ~~δαιμονία [~~эв~~ðемони́а] - блаженство  
// > ~~εύ~~λογος [~~э́в~~логос] - разумный  
// > ~~ευ~~μάρεια [~~эв~~ма́рия] - процветание  
// > ~~ευ~~νοιοκρατία [~~эв~~ниократи́я] - кумовство 

// А так же:
// > ~~Εύ~~βοια [~~э́в~~ия] - название острова  
// > ~~Εύ~~ζωνες [~~э́в~~зонес] - президентский полк

// **Сочетания**: ευ + κ, π, τ, χ, φ, θ, σ, ψ, ξ  
// **Чи­та­ет­ся как**: [эф] 
// **При­меры**:  
// > ~~ευ~~χαριστώ [~~эф~~харисто́] - спасибо  
// > ~~εύ~~γευστο [~~э́в~~гефсто] - вкусно
// > ~~εύ~~κολος [~~э́ф~~колос] - простой  
// > ~~εύ~~πορος [~~э́ф~~порос] - зажиточный  
// > ~~ευ~~τυχία [~~эф~~тихи́я] - счастье  
// > ~~ευ~~φραίνω [~~эф~~рэ́но] - радоваться  
// > ~~ευ~~θύς [~~эф~~θи́с] - прямой  
// > ~~ευ~~σεβής [~~эф~~севи́с] - набожный  
// > ~~ευ~~ψυχία [~~эф~~психи́я] - храбрость  


// *cочетания, которые встречаются редко, но могут попадаться в именах, фамилиях, аббревиатурах, названиях, и старогреческих словах:


// ##### **Сочетания τσ, τζ**

// **Сочетание**: τσ  
// **Чи­та­ет­ся как**: [ц]  
// **При­мер**: ~~τσ~~έπη [~~ц~~е́пи] - карман 
 
// **Сочетание**: τζ  
// **Чи­та­ет­ся как**: [дз] 
// **При­мер**: ~~τζ~~ιπ [~~дз~~и́п] - джип 

// ##### **Сочетания γγ, γχ, γκ**

// **Сочетание**: γγ  
// **Чи­та­ет­ся как**: [нг]  
// **При­мер**: ά~~γγ~~ελος [а́~~нг~~елос] - Ангелос  

// **Сочетание**: Другие удвоенные ~~**согласные**~~ буквы и ~~**согласные**~~ звуки (еще раз, гласных это не касается)
// **Чи­та­ет­ся как**: один звук  
// **При­меры**:  
// > ά~~μμ~~ος [а́мос] - песок 
// > ~~Εύ~~βοια [~~э́в~~ия] - название острова  

// **Сочетание**: γχ  
// **Чи­та­ет­ся как**: [нх] 
// **При­мер**: ά~~γχ~~ος [а́~~нх~~ос] - волнение  

// **Сочетания**: γκ (в начале слова)  
// **Чи­та­ет­ся как**: [г]  
// **При­мер**: ~~γκ~~ολφ [~~г~~о́лф] - гольф  

// **Сочетания**: γκ (в середине слова)  
// **Чи­та­ет­ся как**: [нг] или [г] 
// **При­мер**: κα~~γκ~~ουρό [кан~~г~~уро́] - кенгуру   

// ##### **Сочетания ντ, μπ**

// **Сочетания**: ντ (в начальном слоге)  
// **Чи­та­ет­ся как**: [д]  
// **При­меры**:  
// > ~~ντ~~ους [~~д~~ус] - душ  
// > α~~ντ~~ίο [а~~д~~ио́] – прощай

// **Сочетания**: ντ (в середине слова)  
// **Чи­та­ет­ся как**: [нд] или [д] (нужно проверять по словарю)
// **При­меры**:  
// > κον~~τά~~ [кон~~да́~~] - рядом


// **Сочетания**: μπ (в начальном слоге)  
// **Чи­та­ет­ся как**: [б]
// **При­мер**: ~~μπ~~ίρα [~~б~~и́ра] - пиво  

// **Сочетания**: μπ (в середине слова)  
// **Чи­та­ет­ся как**: [б] или [мб] (нужно проверять по словарю)  
// **При­мер**: κολυ~~μπ~~ώ [коли~~мб~~о́] - плавать 

// ##### Сочетания ν с глухими согласными на стыке слов

// Если первое слово оканчивается на согласную букву ~~ν~~, а второе слово начинается с согласных глухих звуков ~~κ, π, τ, τσ, ψ, ξ~~, то произношение последних будет меняться делая их более звонкими.

// **Сочетания**: ν + κ  
// **Чи­та­ет­ся как**: [нг]  
// **При­мер**: το~~ν κ~~αιρό [то~~нг~~еро́] - погода  

// **Сочетания**: ν + τ  
// **Чи­та­ет­ся как**: [нд] 
// **При­мер**: το~~ν τ~~ρόπο [то~~нд~~ро́по] - способ  

// **Сочетания**: ν + π, ν + ψ  
// **Чи­та­ет­ся как**: [нб]  
// **При­меры**: τη~~ν π~~όλη [ти~~нб~~о́ли] - город  

// **Сочетания**: ν + ξ  
// **Чи­та­ет­ся как**: [нгз] 
// **При­мер**: το~~ν ξ~~έρω [то~~нгз~~е́ро] - я знаю  

// **Сочетания**: ν + τσ  
// **Чи­та­ет­ся как**: [ндз]  
// **При­мер**: το~~ν τσ~~άρο [то~~ндз~~а́ро] - царя  

// ### Особенности разговороной речи

// Часто в разговорной речи можно встретить ситуации, когда определенные пары слов как бы смешиваются в одно, делая при этом паузу между ними малоуловимой.

// ##### Гласные на стыке слов

// τ**ο ά**σπρο [то а́спро] → τ**ά**σπρο [та́спро]  
// (окончание первого слова исчезает)

// τ**ι εί**ναι [ti ˈine] → **τί’**ναι [ˈtine]  
// (начало второго слова исчезает)

// αυτ**ό εί**ναι [афто́ и́нэ] → αυτ**ό**’ναι [афто́нэ]  
// (начало второго слова исчезает)

// ##### Согласные на стыке слов

// το**ν φ**ίλο [тон фило] → το’**φ**ίλο [тофило]  
// (окончание первого слова исчезает)

// τη**н π**όρτα [tin ˈporta] → τι’**π**όρта [tiˈporta]  
// (окончание первого слова исчезает)

// ### **Особенности письменной речи**

// Отдельное слово стоит сказать про ударение, отсутствие которого зачастую считается ошибкой. Это важно, так как в зависимости от ударения перевод слова может отличаться. Например, слово άλλα означает "другой", а αλλά - означает "но". При этом в словах, которые написаны прописными буквами - ударение не ставится. И так же в некоторых коротких словах с одной гласной ударение может отсутствовать.
// Помимо этого в греческом языке используется другой символ, обозначающий вопрос. Вместо классического вопросительного знака "?" используется точка с запятой ";"
// `;

const MD = '';

function LessonTheory({ lessonId }: LessonTheoryProps) {
  const {lessonsById} = useLessons();
  const [markdownContent, setMarkdownContent] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!MD) {
      setLoading(true);
      loadEncryptedContent(lessonsById[lessonId].article_url)
        .then(setMarkdownContent)
        .catch(() => {
          setMarkdownContent("Loading error")
        })
        .finally(() => { 
            setLoading(false);
        });
    } else {
      setMarkdownContent(MD);
    }

  }, []);

  return (
    <>
      {!loading && 
      // style={{ backgroundColor: '#f0f0f0' }}
        <ScrollView 
          style={styles.container} 
          nestedScrollEnabled={true}
        >
          <Markdown style={mdstyles}>{markdownContent}</Markdown>
        </ScrollView>
      }
      <Loader loading={loading}/>
    </>
  )
}


const styles = StyleSheet.create({

  title: {
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 6,
    backgroundColor: "#ffff"
  },
  main: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  scrollView: {
    flexWrap: "wrap",
    backgroundColor: "white"
  },
  separator: {
    borderTopColor: '#eee',
    borderTopWidth: 1
  },
  practiceButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
    minHeight: 65,
  },
  practiceButtonText: {
    textAlign: "left",
    fontWeight: 400,
    fontSize: 16,
    paddingRight: 42
  },
});

const vocabularyStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "white"
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dedbdb",
    paddingVertical: 8
  },
  cell: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 4
  },
  headerRow: {
    borderBottomWidth: 2,
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold"
  }
});

const mdstyles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: '#fff',
    textAlign: "justify"
  },
  view: {
    marginVertical: 8,
    textAlign: "justify"

  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    fontFamily: 'Courier',
  },
  codeInline: {
    backgroundColor: '#eee',
    paddingHorizontal: 4,
    borderRadius: 4,
    fontFamily: 'Courier',
  },
  s: {
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    fontWeight: 500
  },
  em: {
    fontStyle: 'italic',
  },
  headingContainer: {
    marginVertical: 8,
  },
  heading: {
    fontWeight: 'bold',
  },
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  heading2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  heading3: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  heading4: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  heading5: {
    fontSize: 16,
    fontWeight: 'bold',
    // borderLeftWidth: 2,
    // borderBottomWidth: 1.5,
    // borderTopWidth: 2,
    // borderColor: '#b2b2b2',
    backgroundColor:"#f2f2f2",
    paddingLeft: 6,
    paddingBottom: 4,
    marginTop: 12,
    // borderBottomLeftRadius: 6,
    // borderTopLeftRadius: 6
  },
  heading6: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hr: {
    borderBottomWidth: 1,
    borderColor: '#b2b2b2',
    marginVertical: 6,
  },
  blockquote: {
    backgroundColor: 'none',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ccc',
    marginBottom: 6
  },
  inlineCode: {
    backgroundColor: '#eee',
    paddingHorizontal: 4,
    borderRadius: 4,
    fontFamily: 'Courier',
  },
  list: {
    marginVertical: 4,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listUnordered: {},
  listUnorderedItem: {},
  listUnorderedItemIcon: {
    marginRight: 6,
  },
  listUnorderedItemText: {
    flex: 1,
  },
  listOrdered: {},
  listOrderedItem: {},
  listOrderedItemIcon: {
    marginRight: 6,
  },
  listOrderedItemText: {
    flex: 1,
  },
  paragraph: {
    lineHeight: 20,
    fontSize: 14,
    margin: 0,
    textAlign: "justify",
  },
  // hardbreak: {
  //   height: 10,
  // },
  strong: {
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 12,
  },
  tableHeader: {
    backgroundColor: '#eee',
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    padding: 8,
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  th: {
    fontWeight: 600
  },
  tableRowCell: {
    padding: 8,
  },
  text: {
    margin: 0,
    color: '#333',
    textAlign: 'justify'
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    backgroundColor: 'red'
  },
  link: {
    color: '#007aff',
    textDecorationLine: 'underline',
  },
  blocklink: {
    flex: 1,
  },
  u: {
    textDecorationLine: 'underline',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 12,
  },
});