import './NoteGraphicPage.css';
import React from 'react';
import Phaser from 'phaser';

import Stage from './components/StageScene';


const NoteGraphicPage = () => {
    const [game, setGame] = React.useState();

        const width = window.innerWidth;
        const height = window.innerHeight;
        const config = {
            type:Phaser.AUTO,   // WebGL or Canvas 맞춤 선택
            width:width,
            height:height,
            physics:{
                default:'arcade',   // arcade 엔진
                arcade : {
                    debug:false,   // 디버깅 사용
                }
            },
            scale:{ // 배율설정
                mode:Phaser.Scale.FIT,  // 자동맞춤
                autoCenter:Phaser.Scale.CENTER_BOTH,    // 중앙
                width:width,    // 비율설정용 폭
                height:height,  // 비율설정용 높이
            },
            // Scene 설정
            scene: [Stage]
        }

        React.useEffect(() => {
            const _game = new Phaser.Game(config);
    
            setGame(_game);
    
            return () => {
                _game.destroy(true);    // 나갈 때 destroy
                setGame(undefined);
            };
        }, []);

        return (
            <div id="phaser-example"></div>
        );

}

export default NoteGraphicPage;