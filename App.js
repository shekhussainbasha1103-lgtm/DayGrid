import React, { useMemo, useState } from 'react';
import {
  SafeAreaView, View, Text, ScrollView, TouchableOpacity, TextInput,
  Switch, StyleSheet, Linking, Alert, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SAMPLE_TIMETABLE = [
  { day: 'Day Order 1', time: '08:00–08:50', subject: 'Programming for Problem Solving', room: 'Room to confirm', faculty: 'Faculty data not connected' },
  { day: 'Day Order 1', time: '09:00–09:50', subject: 'Chemistry for Computer Science', room: 'Room to confirm', faculty: 'Faculty data not connected' },
  { day: 'Day Order 1', time: '10:00–10:50', subject: 'Introduction to Computational Biology', room: 'Room to confirm', faculty: 'Faculty data not connected' },
  { day: 'Day Order 1', time: '11:00–11:50', subject: 'Calculus and Linear Algebra', room: 'Room to confirm', faculty: 'Faculty data not connected' },
];
const SAMPLE_SUBJECTS = [
  { name: 'Programming for Problem Solving', attended: 32, conducted: 40, internal: 38, external: 42, credits: 4, gradePoint: 8 },
  { name: 'Chemistry for Computer Science', attended: 27, conducted: 36, internal: 35, external: 0, credits: 3, gradePoint: 8 },
  { name: 'Introduction to Computational Biology', attended: 30, conducted: 36, internal: 41, external: 0, credits: 2, gradePoint: 9 },
  { name: 'Calculus and Linear Algebra', attended: 29, conducted: 40, internal: 32, external: 0, credits: 4, gradePoint: 7 },
];
const SAMPLE_SCHOLARSHIPS = [
  { title: 'AICTE Saraswati / Yashasvi', detail: 'Check current official eligibility, scheme conditions and deadlines.', status: 'Verify eligibility' },
  { title: 'SRMIST financial assistance', detail: 'Contact the university financial-aid / admissions office for current schemes.', status: 'Ask university' },
  { title: 'State / community scholarships', detail: 'Check official state portals and your institution scholarship cell.', status: 'Check official notice' },
];
const PORTAL_URL = 'https://studentconnect.srmist.edu.in/';

export default function App() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState('Home');
  const [attended, setAttended] = useState('32');
  const [conducted, setConducted] = useState('40');
  const [target, setTarget] = useState('75');
  const [internal, setInternal] = useState('38');
  const [external, setExternal] = useState('42');
  const [goal, setGoal] = useState('8.5');
  const [studyHours, setStudyHours] = useState('2');
  const [planned, setPlanned] = useState(false);
  const [showClassAnalytics, setShowClassAnalytics] = useState(false);
  const [selectedWeekday, setSelectedWeekday] = useState('Monday');
  const [selectedMealDay, setSelectedMealDay] = useState('Monday');
  const [odmlType, setOdmlType] = useState('OD');
  const [odmlDate, setOdmlDate] = useState('');
  const [odmlReason, setOdmlReason] = useState('');
  const [customMenu, setCustomMenu] = useState({});
  const [fontScale, setFontScale] = useState('Normal');
  const [accentChoice, setAccentChoice] = useState('Violet');
  const [studentProfile, setStudentProfile] = useState({
    degree: 'B.Tech',
    department: 'Computer Science and Engineering',
    campus: 'Kattankulathur',
    area: '',
    hostel: '',
    hostelBlock: '',
    roomNumber: '',
    floor: '',
    messBlock: '',
  });
  const [lastSync] = useState('Demo data · not synced to SRM');
  const colors = dark ? {
    bg: '#0B1020', card: '#151D31', card2: '#1D2942', text: '#F4F7FB',
    muted: '#AAB6CC', accent: '#8B9DFF', green: '#45D6A0', red: '#FF7C89',
    border: '#293550', input: '#10182A'
  } : {
    bg: '#F4F7FC', card: '#FFFFFF', card2: '#EAF0FA', text: '#17233B',
    muted: '#64748B', accent: '#4358D6', green: '#07875D', red: '#C33149',
    border: '#D8E1EF', input: '#F7F9FD'
  };
  const accentPalette = { Violet: '#A78BFA', Cyan: '#22D3EE', Coral: '#FB7185', Lime: '#A3E635' };
  const selectedAccent = dark ? (accentPalette[accentChoice] || colors.accent) : ({ Violet: '#6D28D9', Cyan: '#0E7490', Coral: '#BE123C', Lime: '#4D7C0F' }[accentChoice] || colors.accent);
  const themedColors = { ...colors, accent: selectedAccent };
  const s = useMemo(() => makeStyles(themedColors), [dark, accentChoice]);
  const A = Math.max(0, Math.floor(Number(attended) || 0));
  const C = Math.max(0, Math.floor(Number(conducted) || 0));
  const T = Math.min(99.9, Math.max(1, Number(target) || 75));
  const validAttendance = C > 0 && A <= C;
  const attendance = validAttendance ? A / C * 100 : 0;
  const classesNeeded = validAttendance && attendance < T ? Math.ceil((T * C - 100 * A) / (100 - T)) : 0;
  const canMiss = validAttendance && attendance >= T ? Math.max(0, Math.floor(A / (T / 100) - C + 1e-9)) : 0;
  const totalMarks = Math.max(0, Math.min(50, Number(internal) || 0)) + Math.max(0, Math.min(50, Number(external) || 0));
  const weightedGpa = SAMPLE_SUBJECTS.reduce((sum, x) => sum + x.credits * x.gradePoint, 0) / SAMPLE_SUBJECTS.reduce((sum, x) => sum + x.credits, 0);
  const riskCount = SAMPLE_SUBJECTS.filter(x => x.attended / x.conducted < .75).length;

  const Card = ({ children, style }) => <View style={[s.card, style]}>{children}</View>;
  const Label = ({ children }) => <Text style={s.label}>{children}</Text>;
  const Small = ({ children, style }) => <Text style={[s.small, style]}>{children}</Text>;
  const Button = ({ title, onPress, icon }) => (
    <TouchableOpacity onPress={onPress} style={s.button}>
      {icon ? <Ionicons name={icon} size={17} color={colors.text} /> : null}
      <Text style={s.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  const Metric = ({ label, value, note, icon, tint }) => (
    <View style={[s.metric, { borderColor: colors.border }]}>
      <View style={s.metricTop}><Ionicons name={icon} size={18} color={tint || colors.accent}/><Small>{label}</Small></View>
      <Text style={s.metricValue}>{value}</Text>
      {note ? <Small>{note}</Small> : null}
    </View>
  );
  const openPortal = () => Linking.openURL(PORTAL_URL).catch(() => Alert.alert('Unable to open link', PORTAL_URL));
  const header = (title, subtitle) => <View style={s.pageHeader}><Text style={s.pageTitle}>{title}</Text>{subtitle ? <Text style={s.pageSubtitle}>{subtitle}</Text> : null}</View>;
  const field = (label, value, setter, placeholder) => (
    <View style={s.field}><Label>{label}</Label><TextInput value={value} onChangeText={setter} keyboardType="numeric" placeholder={placeholder} placeholderTextColor={colors.muted} style={s.input}/></View>
  );
  const sectionTitle = (title, action, onPress) => (
    <View style={s.sectionHead}><Text style={s.sectionTitle}>{title}</Text>{action ? <TouchableOpacity onPress={onPress}><Text style={s.action}>{action}</Text></TouchableOpacity> : null}</View>
  );

  const Home = () => (
    <>
      <View style={s.hero}>
        <View style={{ flex: 1 }}>
          <Small style={{ color: '#D7DFFF' }}>SRM ONE · STUDENT SPACE</Small>
          <Text style={s.heroTitle}>Your campus,{'\n'}made simpler.</Text>
          <Text style={s.heroSub}>Attendance, academics and campus life in one place.</Text>
        </View>
        <View style={s.heroIcon}><Ionicons name="school-outline" size={30} color="#FFFFFF"/></View>
      </View>
      <View style={s.freshness}><Ionicons name="time-outline" size={16} color={colors.muted}/><Text style={s.freshText}>{lastSync}</Text><View style={s.demoPill}><Text style={s.demoPillText}>DEMO</Text></View></View>
      <View style={s.grid}>
        <Metric label="Attendance" value={`${attendance.toFixed(1)}%`} note="Example calculation" icon="calendar-outline" tint={attendance >= 75 ? colors.green : colors.red}/>
        <Metric label="Est. SGPA" value={weightedGpa.toFixed(2)} note="Sample grade points" icon="analytics-outline"/>
        <Metric label="Internal avg." value="36.5/50" note="Illustrative marks" icon="document-text-outline"/>
        <Metric label="Risk flags" value={`${riskCount}`} note="Sample subject data" icon="alert-circle-outline" tint={riskCount ? colors.red : colors.green}/>
      </View>
      <Card>
        {sectionTitle('Today at a glance', 'View timetable', () => setTab('Schedule'))}
        <View style={s.rowLine}><Ionicons name="calendar" size={19} color={colors.accent}/><View style={{ flex: 1 }}><Text style={s.bodyBold}>Day order: Not connected</Text><Small>Enter the official academic calendar before relying on day-order predictions.</Small></View></View>
        <View style={s.rowLine}><Ionicons name="time" size={19} color={colors.accent}/><View style={{ flex: 1 }}><Text style={s.bodyBold}>Next class: sample schedule</Text><Small>Room and faculty details need verified timetable data.</Small></View></View>
      </Card>
      <Card>
        {sectionTitle('Quick actions')}
        <View style={s.quickGrid}>
          <Button title="Attendance" icon="shield-checkmark-outline" onPress={() => setTab('Attendance')}/>
          <Button title="What-if marks" icon="calculator-outline" onPress={() => setTab('Academics')}/>
          <Button title="Scholarships" icon="ribbon-outline" onPress={() => setTab('More')}/>
          <Button title="Official portal" icon="open-outline" onPress={openPortal}/>
        </View>
      </Card>
      <Card>
        {sectionTitle('Academic risk alerts', 'See all', () => setTab('Academics'))}
        <View style={s.rowLine}><Ionicons name="warning-outline" size={20} color={colors.red}/><View style={{ flex: 1 }}><Text style={s.bodyBold}>{riskCount} sample subject(s) below 75%</Text><Small>Confirm each course's official attendance record; this is only demo data.</Small></View></View>
      </Card>
    </>
  );

  const Attendance = () => (
    <>
      {header('Attendance Guardian', 'Plan ahead of the 75% requirement.')}
      <Card>
        <Text style={s.cardTitle}>Attendance calculator</Text>
        <Text style={s.mutedText}>Enter attended and conducted classes for one subject.</Text>
        <View style={s.twoCols}>{field('Attended', attended, setAttended, '32')}{field('Conducted', conducted, setConducted, '40')}</View>
        {field('Target (%)', target, setTarget, '75')}
        {validAttendance ? <>
          <View style={s.bigNumberRow}><Text style={s.bigNumber}>{attendance.toFixed(2)}%</Text><Text style={[s.status, { color: attendance >= T ? colors.green : colors.red }]}>{attendance >= T ? 'ON TARGET' : 'BELOW TARGET'}</Text></View>
          <View style={s.progressTrack}><View style={[s.progressFill, { width: `${Math.min(100, attendance)}%`, backgroundColor: attendance >= T ? colors.green : colors.red }]} /></View>
          <View style={s.resultBox}>
            {attendance < T ? <><Text style={s.bodyBold}>Attend the next {classesNeeded} consecutive class(es)</Text><Small>Assuming no further absences, this reaches at least {T}%.</Small></> :
              <><Text style={s.bodyBold}>Margin: +{(attendance - T).toFixed(2)} percentage points</Text><Small>Mathematically, up to {canMiss} future class(es) could be missed while staying at/above the target, assuming equal-weight classes and no other rules.</Small></>}
          </View>
        </> : <Text style={[s.small, { color: colors.red }]}>Enter valid counts: conducted must be above zero and attended cannot exceed conducted.</Text>}
      </Card>
      <Card>
        {sectionTitle('Subject watchlist')}
        {SAMPLE_SUBJECTS.map((sub, i) => {
          const p = sub.attended / sub.conducted * 100;
          return <View key={sub.name} style={s.subjectRow}>
            <View style={{ flex: 1 }}><Text style={s.bodyBold}>{sub.name}</Text><Small>{sub.attended}/{sub.conducted} classes</Small></View>
            <Text style={[s.percent, { color: p >= 75 ? colors.green : colors.red }]}>{p.toFixed(1)}%</Text>
          </View>;
        })}
        <Small>Replace sample counts with authorized, per-subject records before using for decisions.</Small>
      </Card>
    </>
  );

  const Academics = () => (
    <>
      {header('Academics', 'Marks, estimates and semester goals.')}
      <Card>
        <Text style={s.cardTitle}>What-if marks calculator</Text>
        <Text style={s.mutedText}>Demo assumption: 50 internal + 50 external = 100 total. Edit this when official subject rules differ.</Text>
        <View style={s.twoCols}>{field('Internal / 50', internal, setInternal, '38')}{field('Expected external / 50', external, setExternal, '42')}</View>
        <View style={s.resultBox}>
          <Text style={s.mutedText}>Projected total</Text>
          <Text style={s.bigNumber}>{totalMarks.toFixed(0)}/100</Text>
          <Text style={s.bodyBold}>{totalMarks.toFixed(0)}% of total marks</Text>
          <Small>This is not an official grade or GPA. Apply SRM's verified grade boundaries and exam rules.</Small>
        </View>
      </Card>
      <Card>
        <Text style={s.cardTitle}>Semester goal tracker</Text>
        {field('Target SGPA (0–10)', goal, setGoal, '8.5')}
        <View style={s.twoCols}>
          <Metric label="Sample SGPA" value={weightedGpa.toFixed(2)} note="Credit weighted" icon="trending-up"/>
          <Metric label="Your target" value={goal || '—'} note={Number(goal) > weightedGpa ? `${(Number(goal)-weightedGpa).toFixed(2)} points above sample` : 'At/below sample'} icon="flag-outline"/>
        </View>
        <Small>SGPA is calculated from the sample credit and grade-point list in this project, not your actual SRM result.</Small>
      </Card>
      <Card>
        {sectionTitle('Academic risk alerts')}
        {SAMPLE_SUBJECTS.map(sub => {
          const p = sub.attended / sub.conducted * 100;
          const weak = sub.internal < 30;
          if (p >= 75 && !weak) return null;
          return <View key={sub.name} style={s.rowLine}><Ionicons name="alert-circle" size={20} color={colors.red}/><View style={{ flex: 1 }}><Text style={s.bodyBold}>{sub.name}</Text><Small>{p < 75 ? `Attendance sample is ${p.toFixed(1)}% — below 75%. ` : ''}{weak ? 'Internal marks may need attention.' : ''}</Small></View></View>;
        })}
        <Small>Risk alerts are rules-based examples. They do not predict or guarantee academic outcomes.</Small>
      </Card>
      <Card>
        {sectionTitle('Personalized study planner')}
        {field('Available study hours per day', studyHours, setStudyHours, '2')}
        <View style={s.rowLine}><Ionicons name="book-outline" size={20} color={colors.accent}/><View style={{ flex: 1 }}><Text style={s.bodyBold}>{Math.max(0, Number(studyHours)||0)} hour(s) available</Text><Small>Suggested: 40% weakest topic, 30% upcoming assessment, 20% practice problems, 10% revision. Adjust to your syllabus and deadlines.</Small></View></View>
        <TouchableOpacity style={s.checkRow} onPress={() => setPlanned(!planned)}><Ionicons name={planned ? 'checkbox' : 'square-outline'} size={22} color={colors.accent}/><Text style={s.body}>Mark today's study session {planned ? 'complete' : 'as planned'}</Text></TouchableOpacity>
      </Card>
    </>
  );

  const Schedule = () => (
    <>
      {header('Schedule', 'Timetable and day order')}
      <Card>
        <Text style={s.cardTitle}>Day order</Text>
        <Text style={s.bodyBold}>Not automatically determined yet</Text>
        <Small>Day order depends on the current official SRM academic calendar, holidays and schedule changes. Add the verified calendar before this app labels today's order.</Small>
        <Button title="Open official student portal" icon="open-outline" onPress={openPortal}/>
      </Card>
      <Card>
        {sectionTitle('Sample timetable')}
        {SAMPLE_TIMETABLE.map((item, i) => <View key={i} style={s.timetableRow}>
          <View style={s.timePill}><Text style={s.timeText}>{item.time}</Text></View>
          <View style={{ flex: 1 }}><Text style={s.bodyBold}>{item.subject}</Text><Small>{item.day} · {item.room}</Small><Small>{item.faculty}</Small></View>
        </View>)}
        <Small>Replace with your actual timetable. Sample periods are illustrative and must not be treated as today's schedule.</Small>
      </Card>
      <Card>
        {sectionTitle('Smart notifications')}
        <View style={s.rowLine}><Ionicons name="notifications-outline" size={21} color={colors.accent}/><View style={{ flex: 1 }}><Text style={s.bodyBold}>Suggested reminders</Text><Small>Attendance below target · tomorrow's classes · exam/assignment deadlines · scholarship deadlines · stale data.</Small></View></View>
        <Small>Push notifications require notification permissions and a notification service; this starter currently shows in-app guidance only.</Small>
      </Card>
    </>
  );


  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const meals = [
    { key: 'Morning', time: 'Breakfast', icon: 'sunny-outline' },
    { key: 'Afternoon', time: 'Lunch', icon: 'restaurant-outline' },
    { key: 'Evening snacks', time: 'Snacks', icon: 'cafe-outline' },
    { key: 'Night dinner', time: 'Dinner', icon: 'moon-outline' },
  ];
  const sampleMenu = {
    Monday: ['Idli / pongal (sample)', 'Rice, sambar, poriyal (sample)', 'Tea / snack (sample)', 'Chapati, curry, rice (sample)'],
    Tuesday: ['Dosa / upma (sample)', 'Rice, kuzhambu, vegetables (sample)', 'Tea / sundal (sample)', 'Rice, dal, vegetables (sample)'],
    Wednesday: ['Poori / idli (sample)', 'Rice, sambar, kootu (sample)', 'Tea / sandwich (sample)', 'Chapati, kurma (sample)'],
    Thursday: ['Pongal / dosa (sample)', 'Rice, rasam, poriyal (sample)', 'Tea / snack (sample)', 'Rice, chapati, curry (sample)'],
    Friday: ['Idli / upma (sample)', 'Rice, sambar, vegetables (sample)', 'Tea / pakoda (sample)', 'Rice, curry, chapati (sample)'],
    Saturday: ['Dosa / bread (sample)', 'Rice, dal, vegetables (sample)', 'Tea / snack (sample)', 'Dinner menu to confirm'],
  };
  const Campus = () => (
    <>
      {header('Daygrid', 'Your campus life, mapped and organized.')}
      <Card>
        {sectionTitle('Mess menu', 'Choose a day to view all meals')}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
          {weekdays.map(day => <TouchableOpacity key={day} onPress={() => setSelectedMealDay(day)} style={[s.dayChip, selectedMealDay === day && { backgroundColor: selectedAccent, borderColor: selectedAccent }]}>
            <Text style={[s.dayChipText, selectedMealDay === day && { color: '#101225' }]}>{day.slice(0,3)}</Text>
          </TouchableOpacity>)}
        </ScrollView>
        <Text style={s.bodyBold}>{selectedMealDay} · menu preview</Text>
        {meals.map((meal, i) => {
          const key = `${selectedMealDay}-${meal.key}`;
          const val = customMenu[key] ?? sampleMenu[selectedMealDay][i];
          return <View key={meal.key} style={s.timetableRow}>
            <View style={s.mealIcon}><Ionicons name={meal.icon} size={20} color={selectedAccent}/></View>
            <View style={{ flex: 1 }}>
              <Text style={s.bodyBold}>{meal.key}</Text>
              <TextInput value={val} onChangeText={v => setCustomMenu(prev => ({...prev, [key]: v}))} placeholder="Enter verified mess menu" placeholderTextColor={colors.muted} style={s.input}/>
            </View>
          </View>;
        })}
        <Small>Sample menu is illustrative only. Replace it with the official mess menu for your hostel and mess block. Changes here are local to this prototype.</Small>
      </Card>
      <Card>
        {sectionTitle('Find my classroom', 'Room and faculty details must be verified')}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
          {weekdays.map(day => <TouchableOpacity key={day} onPress={() => setSelectedWeekday(day)} style={[s.dayChip, selectedWeekday === day && { backgroundColor: selectedAccent, borderColor: selectedAccent }]}>
            <Text style={[s.dayChipText, selectedWeekday === day && { color: '#101225' }]}>{day.slice(0,3)}</Text>
          </TouchableOpacity>)}
        </ScrollView>
        {SAMPLE_TIMETABLE.map((item, i) => <View key={i} style={s.timetableRow}>
          <View style={s.timePill}><Text style={s.timeText}>{item.time}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={s.bodyBold}>{item.subject}</Text>
            <Small>{selectedWeekday} · {item.room}</Small>
            <Small>{item.faculty}</Small>
            <Small>Building / floor: not verified · Map pin: not connected</Small>
          </View>
        </View>)}
        <Button title="Open campus map search" icon="map-outline" onPress={() => Linking.openURL('https://www.google.com/maps/search/SRM+Institute+of+Science+and+Technology+Kattankulathur+campus').catch(() => {})}/>
        <Small>For turn-by-turn directions to a specific classroom, add the verified building, floor and room location from the official timetable or campus map.</Small>
      </Card>
      <Card>
        {sectionTitle('Faculty & advisor')}
        <Text style={s.bodyBold}>Faculty advisor</Text>
        <Small>Name, staff ID, department, office hours and advisor room will appear here after official details are verified.</Small>
        <View style={s.resultBox}>
          <Text style={s.body}>Course faculty: official assignment not connected</Text>
          <Text style={s.body}>Faculty advisor: not confirmed</Text>
          <Text style={s.body}>Room / building: not confirmed</Text>
        </View>
      </Card>
      <Card>
        {sectionTitle('OD / ML planner', 'Plan a request; this does not submit it to SRM')}
        <View style={s.choiceRow}>
          {['OD', 'ML'].map(type => <TouchableOpacity key={type} onPress={() => setOdmlType(type)} style={[s.choice, odmlType === type && { borderColor: selectedAccent, backgroundColor: colors.card2 }]}>
            <Text style={[s.bodyBold, odmlType === type && { color: selectedAccent }]}>{type === 'OD' ? 'On Duty (OD)' : 'Medical Leave (ML)'}</Text>
          </TouchableOpacity>)}
        </View>
        <Label>Date (YYYY-MM-DD)</Label>
        <TextInput value={odmlDate} onChangeText={setOdmlDate} placeholder="2026-11-02" placeholderTextColor={colors.muted} style={s.input}/>
        <Label>Reason / event</Label>
        <TextInput value={odmlReason} onChangeText={setOdmlReason} placeholder="Enter a short reason" placeholderTextColor={colors.muted} style={s.input}/>
        <Button title="Preview request checklist" icon="document-text-outline" onPress={() => Alert.alert(`${odmlType} planning checklist`, `${odmlType} date: ${odmlDate || 'Not selected'}\nReason: ${odmlReason || 'Not entered'}\n\nCheck the current SRM rules and submit through the official process. This app has not applied for or approved leave.`)}/>
        <Small>OD and ML are only planning tools here. Approval and attendance treatment depend on official university rules; never assume a request is approved.</Small>
      </Card>

      <Card>
        {sectionTitle('My campus & stay', 'Keep your own campus details in one place')}
        {[
          ['degree','Daygrid / programme','B.Tech'],
          ['department','Department / branch','e.g. CSE Core'],
          ['campus','Campus','e.g. Kattankulathur'],
          ['area','Area / zone','e.g. hostel zone or campus area'],
          ['hostel','Hostel name','Enter your hostel name'],
          ['hostelBlock','Block / wing','Enter block or wing'],
          ['floor','Floor','Enter floor'],
          ['roomNumber','Hostel room number','Enter room number'],
          ['messBlock','Mess / dining hall','Enter mess name or block'],
        ].map(([key,label,placeholder]) => <View key={key} style={{ marginBottom: 8 }}>
          <Label>{label}</Label>
          <TextInput
            value={studentProfile[key]}
            onChangeText={value => setStudentProfile(prev => ({ ...prev, [key]: value }))}
            placeholder={placeholder}
            placeholderTextColor={colors.muted}
            style={s.input}
          />
        </View>)}
        <Small>These are local profile fields in this prototype. They are not verified or synced with SRM records and may not persist after the app restarts. Avoid sharing your room number publicly.</Small>
      </Card>
      <Card>
        {sectionTitle('Portal, redesigned', 'Useful modules in Daygrid—not a copy of the website')}
        <View style={s.portalGrid}>
          {[
            ['Attendance','checkmark-circle-outline','Attendance Guardian'],
            ['Marks & exams','school-outline','Internal / assessment'],
            ['Announcements','megaphone-outline','Notices & bulletin'],
            ['Assignments','document-text-outline','Tasks & deadlines'],
            ['Timetable','calendar-outline','Scheduler & day order'],
            ['Syllabus','book-outline','Syllabus & session plan'],
            ['Fees','wallet-outline','Fee records / receipts'],
            ['Documents','folder-open-outline','Student documents'],
            ['Library','library-outline','Library services'],
            ['Holidays','sunny-outline','Academic calendar'],
            ['Profile','person-circle-outline','Student profile'],
            ['Online assessment','laptop-outline','Assessment links'],
          ].map(([title,icon,subtitle]) => <TouchableOpacity key={title} style={s.portalTile} onPress={() => Alert.alert(title, `${subtitle}\\n\\nThis module is a redesigned Daygrid placeholder. It will show real SRM data only after an authorized connection is configured.`)}>
            <View style={[s.portalIcon, { backgroundColor: colors.card2 }]}><Ionicons name={icon} size={21} color={selectedAccent}/></View>
            <Text style={s.bodyBold}>{title}</Text>
            <Text style={s.portalSubtitle}>{subtitle}</Text>
          </TouchableOpacity>)}
        </View>
        <Small>Portal sections vary by account and campus. Daygrid should only enable sections that your account actually has and that SRMIST permits it to access.</Small>
      </Card>

      <Card>
        {sectionTitle('Personalize the look')}
        <Label>Accent color</Label>
        <View style={s.choiceRow}>
          {['Violet','Cyan','Coral','Lime'].map(name => <TouchableOpacity key={name} onPress={() => setAccentChoice(name)} style={[s.colorChoice, { backgroundColor: ({Violet:'#A78BFA',Cyan:'#22D3EE',Coral:'#FB7185',Lime:'#A3E635'})[name], borderWidth: accentChoice === name ? 3 : 1, borderColor: accentChoice === name ? colors.text : colors.border }]}>
            <Text style={{ color: '#111827', fontWeight: '800', fontSize: 10 }}>{name}</Text>
          </TouchableOpacity>)}
        </View>
        <Label>Text size preference</Label>
        <View style={s.choiceRow}>
          {['Compact','Normal','Large'].map(name => <TouchableOpacity key={name} onPress={() => setFontScale(name)} style={[s.choice, fontScale === name && { borderColor: selectedAccent, backgroundColor: colors.card2 }]}>
            <Text style={[s.bodyBold, fontScale === name && { color: selectedAccent }]}>{name}</Text>
          </TouchableOpacity>)}
        </View>
        <Small>Accent color changes the current theme. Text size preference is saved only during this app session in this starter; full font-family selection and saved preferences can be added next.</Small>
      </Card>
      <Card>
        {sectionTitle('Daily reminder plan')}
        <Text style={s.bodyBold}>Class reminders and leave-home alerts</Text>
        <Small>Planned reminders: class starts soon, next classroom/building, pack laptop/ID card, lunch, assignment deadline, and tomorrow's first class.</Small>
        <Button title="Preview daily reminder" icon="notifications-outline" onPress={() => Alert.alert('Daily reminder preview', 'Tomorrow: check your verified timetable, classroom location, ID card, laptop and assignment deadlines. Real scheduled push notifications still need notification setup and a production build.')}/>
      </Card>
    </>
  );

  const More = () => (
    <>
      {header('Student services', 'Tools, scholarships and university links.')}
      <Card>
        {sectionTitle('Scholarship tracker')}
        {SAMPLE_SCHOLARSHIPS.map((sch, i) => <View key={i} style={s.scholarship}>
          <View style={{ flex: 1 }}><Text style={s.bodyBold}>{sch.title}</Text><Small>{sch.detail}</Small><Text style={[s.status, { color: colors.accent }]}>{sch.status}</Text></View>
          <Ionicons name="ribbon-outline" size={22} color={colors.accent}/>
        </View>)}
        <Small>Scholarship information is a checklist only. Verify active dates, eligibility and application links on official portals.</Small>
      </Card>
      <Card>
        {sectionTitle('Fees and payments')}
        <Text style={s.bodyBold}>Fee records are not connected</Text>
        <Small>Use the official portal for current dues, receipts and payment status. Do not enter card details or banking passwords in this prototype.</Small>
        <Button title="Open official student portal" icon="open-outline" onPress={openPortal}/>
      </Card>
      <Card>
        {sectionTitle('Faculty directory')}
        <Text style={s.bodyBold}>Faculty assignments not connected</Text>
        <Small>Faculty name, staff ID, official contact and office hours will appear here when verified through an authorized or public official directory.</Small>
      </Card>
      <Card>
        {sectionTitle('Class analytics & privacy')}
        <Text style={s.bodyBold}>Only aggregated data, with approval</Text>
        <Small>Never show classmates' individual marks or attendance. Class comparisons should use authorized anonymized aggregates and a minimum group-size threshold.</Small>
        <TouchableOpacity style={s.checkRow} onPress={() => setShowClassAnalytics(!showClassAnalytics)}><Ionicons name={showClassAnalytics ? 'chevron-up' : 'chevron-down'} size={20} color={colors.accent}/><Text style={s.body}>{showClassAnalytics ? 'Hide details' : 'View privacy approach'}</Text></TouchableOpacity>
        {showClassAnalytics ? <View style={s.resultBox}><Text style={s.body}>• No individual student records</Text><Text style={s.body}>• No class-wide data until authorized</Text><Text style={s.body}>• Suppress small groups to reduce re-identification</Text><Text style={s.body}>• Show source and last-updated time</Text></View> : null}
      </Card>
      <Card>
        {sectionTitle('AI study tools')}
        <Text style={s.bodyBold}>Study assistant placeholder</Text>
        <Small>Planned: upload syllabus/reference PDFs, generate cited notes, flashcards, quizzes and revision plans. A secure AI backend and source-citation handling must be added before release.</Small>
      </Card>
      <Card>
        {sectionTitle('Official links')}
        <Button title="SRM Student Portal" icon="open-outline" onPress={openPortal}/>
        <Button title="SRMIST main website" icon="globe-outline" onPress={() => Linking.openURL('https://www.srmist.edu.in/')}/>
      </Card>
      <Card>
        {sectionTitle('Updates timeline', 'A redesigned feed for attendance, marks and notices')}
        <View style={s.choiceRow}>
          {['All','Attendance','Marks','Notices'].map(filter => (
            <TouchableOpacity key={filter} onPress={() => Alert.alert(`${filter} updates`, 'This demo feed will show official changes after an authorized data connection is configured.')} style={[s.choice, { flex: 1 }]}>
              <Text style={s.bodyBold}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.resultBox}>
          <Text style={s.bodyBold}>Demo update · Attendance</Text>
          <Small>Subject attendance changes will appear here with present/absent count, percentage and last-updated time.</Small>
        </View>
        <View style={s.resultBox}>
          <Text style={s.bodyBold}>Demo update · Published marks</Text>
          <Small>New CA marks and revised results will appear here when provided by the official system.</Small>
        </View>
        <View style={s.resultBox}>
          <Text style={s.bodyBold}>Demo update · Notices</Text>
          <Small>Department notices, timetable changes, events and deadlines will appear here after verification.</Small>
        </View>
        <Small>Current feed is a visual prototype. It does not poll the student portal or receive live notifications yet.</Small>
      </Card>
      <Card>
        {sectionTitle('CGPA / SGPA calculator', 'Editable credit and grade-point model')}
        <Text style={s.bodyBold}>Illustrative semester estimate</Text>
        <Small>Current sample weighted estimate: {weightedGpa.toFixed(2)} / 10</Small>
        <Button title="How to use the calculator" icon="calculator-outline" onPress={() => Alert.alert('CGPA / SGPA calculator', 'Enter each subject’s official credits and grade point, then calculate the credit-weighted average: Σ(credits × grade point) ÷ Σ(credits). Confirm SRMIST grade boundaries and rules before relying on the estimate.')}/>
        <Small>Sample grades are not official results. The calculator should use the current SRMIST regulations for the student’s programme and batch.</Small>
      </Card>
      <Card>
        {sectionTitle('Events & clubs')}
        <View style={s.resultBox}>
          <Text style={s.bodyBold}>Campus events</Text>
          <Small>Save event date, venue, registration link and reminder. Verified official events can be added to this list.</Small>
          <Button title="Add an event reminder" icon="calendar-outline" onPress={() => Alert.alert('Event reminder', 'Event entry form and scheduled notifications are planned for the next build. For now, use your phone calendar for confirmed event dates.')}/>
        </View>
        <View style={s.resultBox}>
          <Text style={s.bodyBold}>Clubs & student communities</Text>
          <Small>Browse club descriptions, meeting schedules, registration links and event notices once verified.</Small>
        </View>
      </Card>
      <Card>
        {sectionTitle('Notes & exam timetable')}
        <Text style={s.bodyBold}>Revision notebook</Text>
        <Small>Organize notes by subject and topic, attach reference PDFs, and create exam revision checklists. Persistent file storage is not enabled in this prototype.</Small>
        <Button title="Open revision checklist" icon="book-outline" onPress={() => Alert.alert('Revision checklist', 'Create one checklist per subject: syllabus topics, notes completed, practice questions and revision status. PDF uploads and cloud sync are future integrations.')}/>
        <View style={[s.resultBox, { marginTop: 10 }]}>
          <Text style={s.bodyBold}>Exam timetable</Text>
          <Small>Exam dates and rooms must be taken from the latest official notice. No exam schedule is assumed in this demo.</Small>
        </View>
      </Card>
      <Card>
        {sectionTitle('eCurriculum solver', 'Understand course requirements')}
        <Text style={s.body}>Planned tools: browse course outcomes, map syllabus topics to learning outcomes, track completed units and build a revision plan.</Text>
        <Button title="Preview curriculum tools" icon="git-network-outline" onPress={() => Alert.alert('eCurriculum solver', 'This module will map official syllabus units and learning outcomes to your notes, practice questions and revision progress. Official curriculum files must be verified before use.')}/>
      </Card>
      <Card>
        {sectionTitle('About Daygrid')}
        <Text style={s.body}>Prototype version 1.0</Text>
        <Small>Sample data only · no SRM account connection · no password collection. Do not rely on sample records for attendance, marks, fees or deadlines.</Small>
      </Card>
    </>
  );

  const renderTab = () => {
    switch (tab) {
      case 'Attendance': return <Attendance/>;
      case 'Academics': return <Academics/>;
      case 'Schedule': return <Schedule/>;
      case 'Campus': return <Campus/>;
      case 'More': return <More/>;
      default: return <Home/>;
    }
  };
  const tabs = [
    { key: 'Home', icon: 'grid-outline', label: 'Home' },
    { key: 'Attendance', icon: 'shield-checkmark-outline', label: 'Attendance' },
    { key: 'Academics', icon: 'school-outline', label: 'Academics' },
    { key: 'Schedule', icon: 'calendar-outline', label: 'Schedule' },
    { key: 'Campus', icon: 'planet-outline', label: 'Campus' },
    { key: 'More', icon: 'apps-outline', label: 'More' },
  ];

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg}/>
      <View style={s.topbar}>
        <View style={s.brand}><View style={s.brandIcon}><Ionicons name="school" size={19} color="#FFFFFF"/></View><View><Text style={s.brandTitle}>Daygrid</Text><Text style={s.brandSub}>YOUR DAY. YOUR CAMPUS. YOUR FLOW.</Text></View></View>
        <View style={s.themeSwitch}><Ionicons name={dark ? 'moon' : 'sunny'} size={17} color={colors.accent}/><Switch value={dark} onValueChange={setDark} trackColor={{ false: '#C9D2E3', true: '#3D4B82' }} thumbColor={dark ? '#A9B5FF' : '#FFFFFF'}/></View>
      </View>
      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {renderTab()}
        <View style={s.footer}><Text style={s.footerText}>Daygrid · Independent prototype · Not an official SRMIST app</Text></View>
      </ScrollView>
      <View style={s.tabbar}>
        {tabs.map(item => <TouchableOpacity key={item.key} onPress={() => setTab(item.key)} style={s.tabItem}>
          <Ionicons name={item.icon} size={21} color={tab === item.key ? colors.accent : colors.muted}/>
          <Text style={[s.tabLabel, { color: tab === item.key ? colors.accent : colors.muted }]}>{item.label}</Text>
        </TouchableOpacity>)}
      </View>
    </SafeAreaView>
  );
}

function makeStyles(c) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.bg },
    topbar: { paddingHorizontal: 18, paddingTop: 9, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.bg },
    brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    brandIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: '#5368D9', alignItems: 'center', justifyContent: 'center' },
    brandTitle: { color: c.text, fontWeight: '800', fontSize: 18, letterSpacing: .2 },
    brandSub: { color: c.muted, fontSize: 9, letterSpacing: 1.4, marginTop: 2 },
    themeSwitch: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    scroll: { flex: 1 },
    content: { paddingHorizontal: 16, paddingBottom: 22, gap: 13 },
    hero: { padding: 20, borderRadius: 23, backgroundColor: '#3448A4', flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
    heroTitle: { color: '#FFFFFF', fontSize: 27, fontWeight: '800', marginTop: 9, lineHeight: 31 },
    heroSub: { color: '#DDE3FF', fontSize: 12, lineHeight: 18, marginTop: 9, maxWidth: 220 },
    heroIcon: { width: 57, height: 57, borderRadius: 19, backgroundColor: '#5A6ED2', alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
    freshness: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 2 },
    freshText: { color: c.muted, fontSize: 11, flex: 1 },
    demoPill: { backgroundColor: c.card2, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 7 },
    demoPillText: { color: c.accent, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    metric: { width: '48%', flexGrow: 1, minHeight: 110, padding: 13, borderRadius: 17, borderWidth: 1, backgroundColor: c.card },
    metricTop: { flexDirection: 'row', alignItems: 'center', gap: 7 },
    metricValue: { color: c.text, fontSize: 25, fontWeight: '800', marginTop: 9 },
    card: { backgroundColor: c.card, borderRadius: 19, padding: 15, borderWidth: 1, borderColor: c.border, gap: 11 },
    pageHeader: { gap: 4, marginTop: 5, marginBottom: 3 },
    pageTitle: { color: c.text, fontSize: 25, fontWeight: '800' },
    pageSubtitle: { color: c.muted, fontSize: 13 },
    sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
    sectionTitle: { color: c.text, fontSize: 16, fontWeight: '800', flex: 1 },
    action: { color: c.accent, fontSize: 12, fontWeight: '700' },
    cardTitle: { color: c.text, fontSize: 17, fontWeight: '800' },
    label: { color: c.muted, fontSize: 12, marginBottom: 6 },
    small: { color: c.muted, fontSize: 11, lineHeight: 16 },
    mutedText: { color: c.muted, fontSize: 12, lineHeight: 17 },
    body: { color: c.text, fontSize: 13, lineHeight: 19 },
    bodyBold: { color: c.text, fontSize: 13, fontWeight: '700', lineHeight: 18 },
    rowLine: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', paddingVertical: 3 },
    quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    button: { flexDirection: 'row', alignItems: 'center', gap: 7, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 12, backgroundColor: c.card2, minHeight: 40 },
    buttonText: { color: c.text, fontSize: 12, fontWeight: '700' },
    twoCols: { flexDirection: 'row', gap: 10 },
    field: { flex: 1, marginTop: 4 },
    input: { color: c.text, backgroundColor: c.input, borderColor: c.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
    bigNumberRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
    bigNumber: { color: c.text, fontSize: 29, fontWeight: '800' },
    status: { fontSize: 10, fontWeight: '800', letterSpacing: .8 },
    progressTrack: { height: 8, backgroundColor: c.card2, borderRadius: 10, overflow: 'hidden', marginTop: 8 },
    progressFill: { height: 8, borderRadius: 10 },
    resultBox: { backgroundColor: c.card2, borderRadius: 13, padding: 12, gap: 5, marginTop: 7 },
    subjectRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: c.border, gap: 12 },
    percent: { fontSize: 16, fontWeight: '800' },
    timetableRow: { flexDirection: 'row', gap: 10, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: c.border },
    portalGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 9 },
    portalTile: { width: '48%', borderWidth: 1, borderColor: c.border, backgroundColor: c.card, borderRadius: 16, padding: 11, marginBottom: 2 },
    portalIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    portalSubtitle: { color: c.muted, fontSize: 11, marginTop: 3 },
    dayChip: { borderWidth: 1, borderColor: c.border, backgroundColor: c.card2, paddingVertical: 8, paddingHorizontal: 13, borderRadius: 14, marginRight: 7 },
    dayChipText: { color: c.text, fontSize: 12, fontWeight: '800' },
    mealIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: c.card2, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
    choiceRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginVertical: 8 },
    choice: { borderWidth: 1, borderColor: c.border, borderRadius: 13, paddingVertical: 10, paddingHorizontal: 12 },
    colorChoice: { borderRadius: 13, paddingVertical: 10, paddingHorizontal: 12, marginRight: 5 },
    timePill: { backgroundColor: c.card2, borderRadius: 9, padding: 8, alignSelf: 'flex-start' },
    timeText: { color: c.accent, fontSize: 10, fontWeight: '700' },
    scholarship: { flexDirection: 'row', gap: 10, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: c.border },
    checkRow: { flexDirection: 'row', gap: 9, alignItems: 'center', paddingVertical: 7 },
    tabbar: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 9, paddingBottom: 7, borderTopWidth: 1, borderTopColor: c.border, backgroundColor: c.card },
    tabItem: { alignItems: 'center', gap: 4, minWidth: 54 },
    tabLabel: { fontSize: 9, fontWeight: '700' },
    footer: { alignItems: 'center', paddingVertical: 13 },
    footerText: { color: c.muted, fontSize: 9, textAlign: 'center' },
  });
}
