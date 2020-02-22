import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, StyleSheet, Text, Image, AsyncStorage, Alert } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../../assets/logo.png';

export default function List() {
	const [techs, setTechs] = useState(['a','b', 'c']);

	userEffect(() => {
		AsyncStorage.getItem('user').then(user_id => {
			const socket = socketio('http://i4-ead.anonymous.mobile.exp.direct:3333', {
				query: { user_id }
			})

			socket.io('booking_response', booking => {
				Alert.alert(`Your booking in ${booking.spot.company} on ${booking.date} was ${booking.approved ? 'APPROVED' : 'REJECTED'}`)
			})
		})
	}, [])

	useEffect(() => {
		AsyncStorage.getItem('techs').then(storageTechs => {
			const techsArray = storageTechs.split(',').map(tech => tech.trim());

			setTechs(techsArray);
		})
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.logo} source={logo} />

			<ScrollView>
				{techs.map(tech => <SpotList key={tech} tech={tech} />)}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	logo: {
		height: 32,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginTop: 50
	}
})