const FADE_TRANSITION_IN_MS = 1000;
const autoRedirectScenarioScreen_MS = 4000;
const autoShowFinalPyramid_MS = 4000;
const autoRedirectScoreScreen_MS = 1000;

const ATTRACT_SCREEN = 'attract-screen';
const INTRODUCTION_SCREEN = 'introduction-screen';
const SELECT_SITE_SCREEN = 'select-site-screen';
const SELECT_SITE_POPUP_SCREEN = 'select-site-popup-screen';
const ADJUST_SIZE_SCREEN = 'adjust-size-screen';
const CHOOSE_MATERIALS_SCREEN = 'choose-materials-screen';
const SELECT_WORKFORCE_SCREEN = 'select-workforce-screen';
const BUILDING_PYRAMID_SCREEN = 'building-pyramid-screen';
const SCENARIO_SCREEN = 'scenario-screen';
const FINAL_PYRAMID_SCREEN = 'final-pyramid-screen';
const SCORE_SCREEN = 'score-screen';
const RESTART_APPLICATION = 'restart-application';

var eventsLoaded = false;
var currentScreen = null;
var previousScreen = null;
var isInTimeout = false;
var timerCountdownInterval;

var tabCount = 0;

/* Interactive */
var TYPE_HIGHER_GROUND = 'higher-ground';
var TYPE_RIVERBANK = 'riverbank';
var TYPE_DESERT = 'desert';

var selectedSite = null;
var selectedPyramidWidth = 2;
var selectedPyramidHeight = 2;
var selectedMaterial = '';
var selectedWorkforce = '';
var resultScenario = null;
var resultScenarioOption = null;

/* Mouse/Touch Handling */
var isMouseDown = false;
var isDragging = false;

/* DEVELOPMENT MODE */
//selectedMaterial = 'granite';
//selectedWorkforce = 'large';

var isAudioEnabled = true;

var timerDimensions = {
    timeoutCountdown: {
        lineThickness: "10",
        circleSize: 444,
        textSize: "290px"
    }
};

var autoRedirectTimeout;
var requestAnimationFrameID;

function cloudCompleteSequenceTemplate() {
    return {
        totalFrames: 30,
        totalFramesWithLoop: 90,
        timeWhenLastUpdate: 0,
        timeFromLastUpdate: 0,
        frameNumber: 0
    };
}

var cloudCompleteSequence = cloudCompleteSequenceTemplate();

function loadAndInitCloudCompleteSequence() {

    if (document.getElementById('preload-cloud-loop-0') === null) {
        var html = '';
        for (var i = 30; i < cloudCompleteSequence.totalFramesWithLoop; i++) {
            html += `<div id="preload-cloud-loop-${i}" style="background-image: url('assets/cloud/cloud_${zeroPad(i, 2)}.png');"></div>`;
        }
        $('body').append(html);
    }

    cloudCompleteSequence = cloudCompleteSequenceTemplate();

    requestAnimationFrameID = requestAnimationFrame(stepCloudComplete);
}


function stepCloudComplete(startTime) {
    const $element = $('.building-cloud-animation');
    const animationDuration = FADE_TRANSITION_IN_MS * 1.75;
    const timePerFrame = animationDuration / cloudCompleteSequence.totalFrames;

    if (!cloudCompleteSequence.timeWhenLastUpdate) {
        cloudCompleteSequence.timeWhenLastUpdate = startTime;
    }

    cloudCompleteSequence.timeFromLastUpdate = startTime - cloudCompleteSequence.timeWhenLastUpdate;

    if (cloudCompleteSequence.timeFromLastUpdate > timePerFrame) {
        if (cloudCompleteSequence.frameNumber >= cloudCompleteSequence.totalFrames) {
            cloudCompleteSequence.frameNumber = 30;

            if (cloudCompleteSequence.totalFrames !== cloudCompleteSequence.totalFramesWithLoop) {
                cloudCompleteSequence.totalFrames = cloudCompleteSequence.totalFramesWithLoop;
            }
        } else {
            $element.attr('src', `assets/cloud/cloud_${zeroPad(cloudCompleteSequence.frameNumber, 2)}.png`);
            cloudCompleteSequence.timeWhenLastUpdate = startTime;
            cloudCompleteSequence.frameNumber = cloudCompleteSequence.frameNumber + 1;
        }
    }

    requestAnimationFrameID = requestAnimationFrame(stepCloudComplete);
}

function startInteractive() {
    $('.default-hidden,.pageContainer').addClass('hidden');

    var mode = 1;
    switch (mode) {
        case 1: // Running full demo:
            move2(ATTRACT_SCREEN);
            break;
        case 2:
            loadEvents();
            move2(INTRODUCTION_SCREEN);
            break;
        case 3:
            loadEvents();
            move2(SELECT_SITE_SCREEN);
            break;
        case 4:
            loadEvents();
            setSelectedSite(TYPE_DESERT);
            move2(SELECT_SITE_POPUP_SCREEN);
            break;
        case 5:
            loadEvents();
            setSelectedSite(TYPE_DESERT);
            move2(ADJUST_SIZE_SCREEN);
            break;
        case 6:
            loadEvents();
            setSelectedSite(TYPE_DESERT);
            move2(CHOOSE_MATERIALS_SCREEN);
            break;
        case 7:
            loadEvents();
            setSelectedSite(TYPE_DESERT);
            move2(SELECT_WORKFORCE_SCREEN);
            break;
        case 8:
            loadEvents();
            setSelectedSite(TYPE_DESERT);
            move2(BUILDING_PYRAMID_SCREEN);
            break;
        case 9:
            loadEvents();
            setSelectedSite(TYPE_DESERT);
            move2(SCENARIO_SCREEN);
            break;
        case 10:
            loadEvents();
            setSelectedSite(TYPE_DESERT);
            move2(FINAL_PYRAMID_SCREEN);
            break;
        case 11:
            loadEvents();
            setSelectedSite(TYPE_DESERT);
            selectOption(1);
            move2(SCORE_SCREEN);
            break;
    }

    loadSVGs();

    $("body").fadeIn();
}

function loadEvents() {
    if (eventsLoaded) {
        return;
    }
    eventsLoaded = true;

    // Renders configuration
    if (!config.onStartup.enableContextMenu) {
        window.addEventListener("contextmenu", function (e) { e.preventDefault(); })
    }

    showHideMouseCursor();

    // Double click handling:
    if (!config.onStartup.enableDoubleClick) {
        $("*").dblclick(function (event) {
            event.preventDefault();
        });
    }

    if (!config.onStartup.enableF12Key) {
        document.onkeydown = function (e) { alert(window.event.keyCode); if (window.event.keyCode === 123 /* F12 */) e.preventDefault(); }
    }
    document.onkeydown = function (e) { if (window.event.keyCode === 32 /* SPACE */) { e.preventDefault(); toggleMouseCursor(); } }

    $("#mainContainer").find("[data-audio]").click(function () {
        const $that = $(this);

        const audiokey = $that.data('audio');
        if (typeof audiokey === 'string') {
            const audiovalue = eval(audiokey);
            if (typeof audiovalue === 'string') {
                playAudioFile(audiovalue);
            }
        }
    });

    $("#mainContainer").find("[data-move2]")
        .click(function (event) {
            event.stopPropagation();
            const isDisabled = $(this).data('disabled');
            if (!isDisabled) {
                lockClickForInterval($(this), FADE_TRANSITION_IN_MS * 2); // x2 fadeout + fadein time

                //playSoundClick($('#attractScreen'));
                move2($(this).data('move2'));
            }
        });

    $(".location-selection").click(function (event) {
        event.stopPropagation();
        const isDisabled = $("#select-site-screen").data('disabled');
        if (!isDisabled) {
            lockClickForInterval($("#select-site-screen"), FADE_TRANSITION_IN_MS * 2); // x2 fadeout + fadein time

            selectLocation($(this));
        }
    });

    $("div.materials-container td").click(function () {
        selectMaterial($(this));
    });

    $("div.workforce-container td").click(function () {
        selectWorkforce($(this));
    });

    $("div.option").click(function () {
        const isDisabled = $(this).closest('.options-container').data('disabled');
        if (!isDisabled) {
            lockClickForInterval($(this).closest('.options-container'), FADE_TRANSITION_IN_MS * 2); // x2 fadeout + fadein time

            //playSoundClick($('#attractScreen'));
            selectOption($(this));
        }
    });

    refreshAdjustSizePyramidSettings();
}

function setSelectedSite(location) {
    switch (location) {
        case TYPE_HIGHER_GROUND:
            selectedSite = {
                type: TYPE_HIGHER_GROUND,
                node: config.content.gameMatrix.higherGround
            };
            break;
        case TYPE_RIVERBANK:
            selectedSite = {
                type: TYPE_RIVERBANK,
                node: config.content.gameMatrix.riverBank
            };
            break;
        case TYPE_DESERT:
            selectedSite = {
                type: TYPE_DESERT,
                node: config.content.gameMatrix.desert
            };
            break;
        default:
            selectedSite = undefined;
            return;
    }
    $('.map-info,.pageContainer,.score-location').attr('data-type', selectedSite.type);
    $("#selected-location-background-video").attr('src', selectedSite.node.backgroundVideo);
    $("#selected-location-background-video").removeClass('hidden').fadeIn();
}

function selectLocation($location) {
    const $screen = $('#select-site-screen');
    $screen.find('.location').removeClass('active');
    $screen.find('.line').removeClass('active');
    $screen.find('.location-selection').removeClass('active');
    $screen.find('.location-label').removeClass('active');

    $location.find('.location').addClass('active');
    $location.find('.location-label').addClass('active');
    $location.find('.line').addClass('active');
    $location.addClass('active');

    var location = $location.data('location');
    setSelectedSite(location);

    if (selectedSite !== undefined) {
        move2(SELECT_SITE_POPUP_SCREEN);
    }
}

function refreshAdjustSizePyramidSettings() {
    $('#width').val(selectedPyramidWidth);
    $('#height').val(selectedPyramidHeight);

    $(".pyramid").attr('data-width', selectedPyramidWidth)
        .attr('data-height', selectedPyramidHeight);
    //$("#choose-materials-screen .pyramid").attr('data-material', selectedMaterial);
    $(".pyramid").attr('data-material', selectedMaterial);
}

function manageSliderHandle(handle) {
    const $handle = $(handle);

    var type = handle.id;
    var value = parseInt($handle.val());

    if (type === 'width') {
        selectedPyramidWidth = value;
    }
    else {
        selectedPyramidHeight = value;
    }

    refreshAdjustSizePyramidSettings();
    refreshSizeDialog();
}

function refreshSizeDialog() {
    for (var i = 0; i < config.content.gameMatrix.adjustSizeScreenDialogs.length; i++) {
        var node = config.content.gameMatrix.adjustSizeScreenDialogs[i];
        if (node.width === selectedPyramidWidth && node.height === selectedPyramidHeight) {
            var $screen = $('#adjust-size-screen .site-panel');
            $screen.find('.dialog').html(node.choise);
            $screen.find('.dialog2').html(node.feedback);
            break;
        }
    }
}

function selectMaterial($material) {
    selectedMaterial = $material.data('type');

    var $container = $('.materials-container');
    $container.find('.material,.material-label p').addClass('notselected');
    $container.find('td[data-type="' + selectedMaterial + '"] p').removeClass('notselected');
    $container.find('.material').removeClass('notselected');

    $container.find('.material,.material-label').removeClass('selected');
    $container.find('td[data-type="' + selectedMaterial + '"] .material').addClass('selected');
    $container.find('td[data-type="' + selectedMaterial + '"] .material-label').addClass('selected');

    var node = null;
    switch (selectedMaterial) {
        case 'limestone':
            node = config.content.screens.chooseMaterialsScreen.limestone.dialog;
            break;
        case 'granite':
            node = config.content.screens.chooseMaterialsScreen.granite.dialog;
            break;
        case 'mudbricks':
            node = config.content.screens.chooseMaterialsScreen.mudbricks.dialog;
            break;
    }
    if (node !== null) {
        var $screen = $("#choose-materials-screen");
        $screen.find(".dialog").html(node);
        $screen.find(".button").removeClass('hidden');
    }

    refreshAdjustSizePyramidSettings();
}

function selectWorkforce($workforce) {
    selectedWorkforce = $workforce.data('type');

    var $container = $('.workforce-container');
    $container.find('.workforce,.workforce-label p').addClass('notselected');
    $container.find('td[data-type="' + selectedWorkforce + '"] p').removeClass('notselected');
    $container.find('td[data-type="' + selectedWorkforce + '"] .workforce').removeClass('notselected');

    $container.find('.workforce,.workforce-label').removeClass('selected');
    $container.find('td[data-type="' + selectedWorkforce + '"] .workforce').addClass('selected');
    $container.find('td[data-type="' + selectedWorkforce + '"] .workforce-label').addClass('selected');

    var node = null;
    switch (selectedWorkforce) {
        case 'small':
            node = config.content.screens.selectWorkforceScreen.small.dialog;
            break;
        case 'medium':
            node = config.content.screens.selectWorkforceScreen.medium.dialog;
            break;
        case 'large':
            node = config.content.screens.selectWorkforceScreen.large.dialog;
            break;
    }
    if (node !== null) {
        var $screen = $("#select-workforce-screen");
        $screen.find(".dialog").text(node);
        $screen.find(".button").removeClass('hidden');
    }

    $('.pyramid-workforce').attr('data-type', selectedWorkforce);
}

function selectOption($option) {
    if (resultScenario === null) {
        return;
    }

    var optionId = parseInt($option.data('type'));

    var nodes = resultScenario.options;
    for (var i = 0; i < nodes.length; i++) {
        if (optionId === nodes[i].id) {
            $(".final-pyramid")
                .attr('data-result', nodes[i].outcome)
                .attr('data-material', selectedMaterial);

            resultScenarioOption = nodes[i];

            const score = getScore();
            const $scoreScreen = $('#score-screen');
            $scoreScreen.find('.title').text(getScoreTitle());
            $scoreScreen.find('.scorecard1 .score-result').text(score.longevity);
            $scoreScreen.find('.scorecard2 .score-result').text(score.efficiency);
            $scoreScreen.find('.scorecard3 .score-result').text(score.grandeur);

            move2(FINAL_PYRAMID_SCREEN);
            return;
        }
    }
}

function getScoreTitle() {
    switch (resultScenarioOption.impact) {
        case 'zero':
            return config.content.gameMatrix.scoreImpactResult.zero;
        case 'half':
            return config.content.gameMatrix.scoreImpactResult.half;
    }
    return config.content.gameMatrix.scoreImpactResult.none;
}

function getDecisionTree() {
    var nodes = config.content.gameMatrix.decisionTree;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.location === selectedSite.type && node.width === selectedPyramidWidth && node.height === selectedPyramidHeight && node.material === selectedMaterial && node.workforce === selectedWorkforce) {
            return getScenario(node.scenario);
        }

    }
    return null;
}

function getScenario(scenario) {
    var nodes = config.content.gameMatrix.scenarios;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.id === scenario) {
            return node;
        }

    }
    return null;
}

function fillScenarioData() {
    if (resultScenario === null) {
        return;
    }

    const $scenarioScreen = $("#scenario-screen");
    $scenarioScreen.find('.title').text(resultScenario.title);
    $scenarioScreen.find('.scenario').text(resultScenario.scenario);
    $scenarioScreen.find('.option1 p').text(resultScenario.options[0].text);
    $scenarioScreen.find('.option2 p').text(resultScenario.options[1].text);
    $scenarioScreen.find('.option3 p').text(resultScenario.options[2].text);

    $scenarioScreen.find('.option1 .icon').attr('data-type', resultScenario.options[0].icon);
    $scenarioScreen.find('.option2 .icon').attr('data-type', resultScenario.options[1].icon);
    $scenarioScreen.find('.option3 .icon').attr('data-type', resultScenario.options[2].icon);

    $scenarioScreen.find('.scene').attr('data-type', selectedSite.type);
    $scenarioScreen.find('.material').attr('data-type', selectedMaterial);
}

function getScore() {
    var locationScore = getLocationScore();
    var scaleScore = getScaleScore();
    var materialScore = getMaterialScore();
    var workforceScore = getWorkforceScore();

    return {
        grandeur: roundScore(locationScore.grandeur + scaleScore.grandeur + materialScore.grandeur + workforceScore.grandeur),
        longevity: roundScore(locationScore.longevity + scaleScore.longevity + materialScore.longevity + workforceScore.longevity),
        efficiency: roundScore(locationScore.efficiency + scaleScore.efficiency + materialScore.efficiency + workforceScore.efficiency),
    };
}

function getLocationScore() {
    for (var i = 0; i < config.content.gameMatrix.scoringMatrix.site.length; i++) {
        var node = config.content.gameMatrix.scoringMatrix.site[i];
        if (node.location === selectedSite.type) {
            return {
                grandeur: node.grandeur,
                longevity: node.longevity,
                efficiency: node.efficiency
            };
        }
    }
    return {
        grandeur: 0,
        longevity: 0,
        efficiency: 0
    };
}

function getScaleScore() {
    for (var i = 0; i < config.content.gameMatrix.scoringMatrix.scale.length; i++) {
        var node = config.content.gameMatrix.scoringMatrix.scale[i];
        if (node.width === selectedPyramidWidth && node.height === selectedPyramidHeight) {
            return {
                grandeur: node.grandeur,
                longevity: node.longevity,
                efficiency: node.efficiency
            };
        }
    }
    return {
        grandeur: 0,
        longevity: 0,
        efficiency: 0
    };
}

function getMaterialScore() {
    for (var i = 0; i < config.content.gameMatrix.scoringMatrix.materials.length; i++) {
        var node = config.content.gameMatrix.scoringMatrix.materials[i];
        if (node.material === selectedMaterial) {
            return {
                grandeur: node.grandeur,
                longevity: node.longevity,
                efficiency: node.efficiency
            };
        }
    }
    return {
        grandeur: 0,
        longevity: 0,
        efficiency: 0
    };
}

function getWorkforceScore() {
    for (var i = 0; i < config.content.gameMatrix.scoringMatrix.workforce.length; i++) {
        var node = config.content.gameMatrix.scoringMatrix.workforce[i];
        if (node.workforceType === selectedWorkforce) {
            return {
                grandeur: node.grandeur,
                longevity: node.longevity,
                efficiency: node.efficiency
            };
        }
    }
    return {
        grandeur: 0,
        longevity: 0,
        efficiency: 0
    };
}

function roundScore(score) {
    var multiplier = 1;
    switch (resultScenarioOption.impact) {
        case 'zero':
            return 0;

        case 'half':
            multiplier = 0.5;
            break;
    }

    return Math.round(score * multiplier * 10 / 12);
}

function lockClickForInterval(element, intervalToUnlock) {
    $(element).data('disabled', true);

    setTimeout(function () {
        $(element).data('disabled', false);
    }, intervalToUnlock);
}

/* BEGIN: Mouse handling */
var toggleMouseCursor = function () {
    config.onStartup.showMouse = !config.onStartup.showMouse;
    showHideMouseCursor();
};


var showHideMouseCursor = function () {
    if (!config.onStartup.showMouse) {
        $("*").css('cursor', 'none');
    }
    else {
        $("*").css('cursor', 'default');
    }
};
/* END: Mouse handling */

/* BEGIN: Timeout */

function loadTimeout() {
    $(document).idleTimer(config.content.screens.timeoutScreen.timeoutOverallInSeconds * 1000);

    var element = $('#timeoutCountdownCircle');

    $(document).on("idle.idleTimer", function (event, elem, obj) {
        if (currentScreen != ATTRACT_SCREEN) {

            startTimer(element, (config.content.screens.timeoutScreen.countdownOverallInSeconds * 1000), ATTRACT_SCREEN, timerDimensions.timeoutCountdown);

            isInTimeout = true;

            $('.timeoutFrame').removeClass('hidden');
        }
    });

    $(document).on("active.idleTimer", function (event, elem, obj, triggerevent) {
        if (currentScreen != ATTRACT_SCREEN) {
            $(element.circleProgress('widget')).stop();

            clearInterval(timerCountdownInterval);

            //disableTimeout();

            isInTimeout = false;

            $('.timeoutFrame').addClass('hidden');
        }
    });
}

function disableTimeout() {
    $(document).idleTimer("destroy");
}

function startTimer(mainElement, countdown, goTo, countdownDimensions, toggleHiddenFromTimer = false) {
    var step = 1000;

    $textElement = $(mainElement).find('.countdownText > p');

    // set dimensions
    $(mainElement).find('.countdownText').css({ 'width': countdownDimensions.circleSize + 'px', 'height': countdownDimensions.circleSize + 'px' });
    $textElement.css({ 'font-size': countdownDimensions.textSize }).text(countdown / step);

    var text = countdown;
    //var interval = setInterval(function () {
    timerCountdownInterval = setInterval(function () {
        text = text - step;
        $textElement.text((text / step));

        if (text == 0)
            clearInterval(timerCountdownInterval);
    }, step);

    // if it's the timer from countdown page, remove the hidden class so that it animates
    if (toggleHiddenFromTimer) {
        $(mainElement).on('circle-animation-start', function (event) {
            toggleHidden($(mainElement));
        });
    }

    //$(mainElement).circleProgress({
    mainElement.circleProgress({
        startAngle: -Math.PI * 1 / 2,
        reverse: true,
        thickness: countdownDimensions.lineThickness,
        emptyFill: "transparent",
        animationStartValue: 1,
        value: 0,
        size: countdownDimensions.circleSize,
        fill: {
            color: "white"
        },
        animation: {
            duration: countdown
        }
    }).on('circle-animation-end', function (event) {

        var circleProgress = $(mainElement).data('circle-progress');

        // if last frame value isnt 0, means that the animation ended because user became active
        if (circleProgress.lastFrameValue === 0) {

            if (goTo === ATTRACT_SCREEN)
                window.location = window.location;

            move2(goTo);
        }
    });
}

/* END: Timeout */
function move2ScenarioScreen() {
    move2(SCENARIO_SCREEN);
}

function move2ScoreScreen() {
    move2(SCORE_SCREEN);
}

function move2(to) {
    if (to === currentScreen) {
        return;
    }

    if (typeof autoRedirectTimeout === "number") {
        clearTimeout(autoRedirectTimeout);
        autoRedirectTimeout = null;
    }

    if (currentScreen === undefined || currentScreen === null) {
        currentScreen = ATTRACT_SCREEN;
    }

    cancelAnimationFrame(requestAnimationFrameID);

    $('#' + currentScreen).fadeOut(FADE_TRANSITION_IN_MS, function () {
        if ($(this).hasClass('panelContainer')) {
            $(".panelContainer").fadeOut(FADE_TRANSITION_IN_MS).addClass('hidden');
        }
        else {
            $(".pageContainer").fadeOut(FADE_TRANSITION_IN_MS).addClass('hidden');
        }

        // Before changing screen events...
        loadContent(to);

        switch (to) {
            case ATTRACT_SCREEN:
                //disableTimeout();
                break;

            case INTRODUCTION_SCREEN:
                loadTimeout();
                sendInteractiveUsage(1);
                //pauseVideo('attractScreenVideo');
                break;

            case SELECT_SITE_SCREEN:
                sendInteractiveUsage(2);
                break;

            case ADJUST_SIZE_SCREEN:
                pauseVideo('attractScreenVideo');
                break;

            case BUILDING_PYRAMID_SCREEN:
                $('.top-navigation-container').fadeOut();
                break;

            case SCORE_SCREEN:
                sendInteractiveUsage(3);
                break;

            case RESTART_APPLICATION:
                restartApplication();
                break;
        }

        // Change screen
        loadScreen(to);
    });
}

function playAudio($that) {
    var src = $that.attr('data-file');
    if (src) {
        var audio = new Audio(src);
        audio.play();
    }
}

function playAudioFile(file) {
    if (isAudioEnabled) {
        var audio = new Audio(file);
        audio.onended = function () {
            isAudioEnabled = true;
        };

        isAudioEnabled = false;

        audio.play();
    }
}

function loadContent(screen) {
    refreshContent();

    const $screen = $('#' + screen);

    switch (screen) {
        case ATTRACT_SCREEN:
            $screen.find('video').attr('src', config.content.screens.attractScreen.backgroundAnimation);
            $screen.find('.screenTitle').text(config.content.screens.attractScreen.title);
            $screen.find('.buttonStart div').text(config.content.screens.attractScreen.buttonText);
            break;

        case INTRODUCTION_SCREEN:
            $screen.find('.introduction-panel p').fadeOut();
            setTimeout(function () {
                $screen.find('.introduction-panel').removeClass('hidden').addClass('animated slideInUp');
                $screen.find('.pm-character').removeClass('hidden').addClass('animated slideInUp');
                $screen.find('.introduction-button').removeClass('hidden').addClass('animated slideInUp');
                setTimeout(function () {
                    $screen.find('.introduction-panel p').fadeIn();
                }, 800)
            }, 2000);
            break;

        case SELECT_SITE_SCREEN:
            $('.top-navigation-container').removeClass('hidden').fadeIn();
            $("#selected-location-background-video").fadeOut();
            updateNavigationTabs(screen);
            break;

        case SELECT_SITE_POPUP_SCREEN:
            $screen.find('.title').text(selectedSite.node.title);
            $screen.find('.content').text(selectedSite.node.content);
            break;

        case ADJUST_SIZE_SCREEN:
        case CHOOSE_MATERIALS_SCREEN:
        case SELECT_WORKFORCE_SCREEN:
            updateNavigationTabs(screen);
            break;

        case BUILDING_PYRAMID_SCREEN:
        case FINAL_PYRAMID_SCREEN:
            playAudioFile(config.content.sounds.build);
            $('.building-cloud-animation').prop('src', 'assets/cloud/cloud_00.png');
            break;

        case SCENARIO_SCREEN:
            resultScenario = getDecisionTree();
            fillScenarioData();
            playAudioFile(config.content.sounds.scenarioPopup);
            break;

        case SCORE_SCREEN:
            playAudioFile(config.content.sounds.scoreReveal);
            break;

        default:
            break;
    }
}

function refreshContent() {
    // Refresh Texts
    $("[data-contentpath]").formatText();

    // Refresh Videos
    $("[data-videosource]").setVideoSources();
}

function updateNavigationTabs(screen) {
    const $node = $('#mainContainer .top-navigation-container');
    $node.find('.box').removeClass('active');

    switch (screen) {
        case SELECT_SITE_SCREEN:
        case SELECT_SITE_POPUP_SCREEN:
            $node.find('.box-select-site').closest('.box').addClass('active');
            break;

        case ADJUST_SIZE_SCREEN:
            $node.find('.box-select-site').closest('.box').addClass('completed');
            $node.find('.number1').data('type', '3');

            $node.find('.box-adjust-size').closest('.box').addClass('active');
            $node.find('.number2').data('type', '1');
            break;

        case CHOOSE_MATERIALS_SCREEN:
            $node.find('.box-adjust-size').closest('.box').addClass('completed');
            $node.find('.number2').data('type', '3');


            $node.find('.box-choose-materials').closest('.box').addClass('active');
            $node.find('.number3').data('type', '1');
            break;

        case SELECT_WORKFORCE_SCREEN:
            $node.find('.box-choose-materials').closest('.box').addClass('completed');
            $node.find('.number3').data('type', '3');

            $node.find('.box-select-workforce').closest('.box').addClass('active');
            break;

        default:
            break;
    }
}

function loadScreen(screenIdToLoad) {
    previousScreen = currentScreen;
    currentScreen = screenIdToLoad;

    config.screen = currentScreen;

    const $currentScreen = $('#' + screenIdToLoad);

    //if (previousScreen !== null) {
    //    const $previousScreen = $('#' + previousScreen);
    //    if ($previousScreen.hasClass('default-hidden')) {
    //        $previousScreen.removeClass('hidden');
    //    }
    //    $previousScreen.find('.default-hidden').addClass('hidden');
    //}

    $currentScreen.fadeIn(FADE_TRANSITION_IN_MS, function () {
        //if ($currentScreen.hasClass('default-hidden')) {
        //    $currentScreen.removeClass('hidden');
        //}
        //$currentScreen.find('.default-hidden').removeClass('hidden');

        // After changing screen events...
        switch (screenIdToLoad) {
            case ATTRACT_SCREEN:
                loadEvents();
                break;

            case BUILDING_PYRAMID_SCREEN:
                window.odometerOptions = {
                    auto: false, // Don't automatically initialize everything with class 'odometer'
                    selector: '.odometer', // Change the selector used to automatically find things to be animated
                    format: 'ddd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
                    duration: 2000, // Change how long the javascript expects the CSS animation to take
                    theme: 'car', // Specify the theme (if you have more than one theme css file on the page)
                    animation: 'count' // Count is a simpler animation method which just increments the value,
                    // use it when you're looking for something more subtle.
                };
                $currentScreen.find('.js-odometer-1').html(23);
                loadAndInitCloudCompleteSequence();
                autoRedirectTimeout = setTimeout(move2ScenarioScreen, autoRedirectScenarioScreen_MS);
                break;

            case FINAL_PYRAMID_SCREEN:
                $currentScreen.find('.js-odometer-2').html(35);
                loadAndInitCloudCompleteSequence();
                autoRedirectTimeout = setTimeout(showFinalPyramid, autoShowFinalPyramid_MS);
                break;

            default:
                break;
        }
    });
}

function showFinalPyramid() {
    const $screen = $('#final-pyramid-screen');
    $screen.find('.building-cloud-animation').fadeOut();
    $screen.find('.final-pyramid').removeClass('hidden').fadeIn();

    setTimeout(move2ScoreScreen, autoRedirectScoreScreen_MS);
}

function playVideo(videoId) {
    const video = document.getElementById(videoId);
    if (video !== null && video.paused) {
        $('#' + videoId).fadeIn();
        video.play();
    }
}

function toggleHidden(elements) {
    if ($(elements).hasClass('hidden')) {
        $(elements).removeClass('hidden');
    }
    else {
        $(elements).addClass('hidden');
    }
}

function pauseVideo(videoId) {
    const video = document.getElementById(videoId);
    if (video !== null) {
        $('#' + videoId).fadeOut();
        video.pause();
    }
}


function zeroPad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
    var zeroString = Math.pow(10, zeros).toString().substr(1);
    if (num < 0) {
        zeroString = '-' + zeroString;
    }

    return zeroString + n;
}

/* BEGIN: SVG handling */

/*
 * Replace all SVG images with inline SVG
 */
function loadSVGs() {
    $('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

            if ($img.hasClass('addSvgContainer')) {
                addSvgContainer($svg);
            }

        }, 'xml');
    });
}
/* END: SVG handling */

/* START: jQuery Extensions */
function getTextProperties(key) {
    if (typeof key === "string") {
        try {
            key = eval(key);
        } catch (e) { }
    }

    if (typeof key !== "string") {
        return {
            Text: "NOT FOUND"
        };
    }

    var text = key;
    return {
        Text: text
    };
}

jQuery.fn.setVideoSources = function () {
    $(this)
        .each(function () {
            var o = $(this); // It's your element

            var path = o.data('videosource');
            var properties = getTextProperties(path);
            if (o.attr('src') !== properties.Text) {
                o.attr('src', properties.Text);
            }
        });
    return this; // This is needed so others can keep chaining off of this
};


jQuery.fn.formatText = function () {
    $(this)
        .each(function () {
            var o = $(this); // It's your element

            var path = o.data('contentpath');

            var properties = getTextProperties(path);
            o.html(properties.Text);
        });
    return this; // This is needed so others can keep chaining off of this
};

/* END: jQuery Extensions */


/* BEGIN: Extensions */
Object.defineProperty(Array.prototype, "ConcatArray", {
    value: function (before, after) {
        if (before === undefined) before = '';
        if (after === undefined) after = '';
        var result = '';
        for (var i = 0; i < this.length; i++) {
            result += before + this[i] + after;
        }
        return result;
    },
    writable: true,
    configurable: true
});
/* END: Extensions */


/* BEGIN: Events handling */
function addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
}

/* BEGIN: Array handling */
function cloneArray(array) {
    var newArray = [].concat(array);
    return newArray;
}

function shuffleArray(array) {
    var newArray = cloneArray(array);
    for (var j, x, i = newArray.length; i; j = Math.floor(Math.random() * i), x = newArray[--i], newArray[i] = newArray[j], newArray[j] = x);
    return newArray;
}
/* END: Array handling */


/* BEGIN: Tools */
function addOrdinalSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function restartApplication() {
    selectedSite = null;
    selectedPyramidWidth = 2;
    selectedPyramidHeight = 2;
    selectedMaterial = '';
    selectedWorkforce = '';
    resultScenario = null;
    resultScenarioOption = null;

    $("#selected-location-background-video").fadeOut();
    playVideo('attractScreenVideo');

    // Introduction screen:
    $('#introduction-screen .introduction-panel').addClass('hidden').removeClass('animated slideInUp');
    $('#introduction-screen .pm-character').addClass('hidden').removeClass('animated slideInUp');
    $('#introduction-screen .introduction-button').addClass('hidden').removeClass('animated slideInUp');

    $('#mainContainer .top-navigation-container').find('.box').removeClass('completed');
    $('#select-site-screen div').removeClass('active');
    $('#choose-materials-screen div,#choose-materials-screen p').removeClass('selected notselected');
    $('#select-workforce-screen div,#select-workforce-screen p').removeClass('selected notselected');

    // Materials:
    $("#choose-materials-screen").find(".button").addClass('hidden');

    refreshAdjustSizePyramidSettings();

    // workforce:
    $('#select-workforce-screen').find(".button").addClass('hidden');
    $('.pyramid-workforce').attr('data-type', '');

    // Clouds
    $('#final-pyramid-screen .building-cloud-animation').fadeIn();
    $('#final-pyramid-screen .final-pyramid').fadeOut();

    $('.js-odometer-1').html('000');
    $('.js-odometer-2').html('000');

    move2(INTRODUCTION_SCREEN);
}
/* END: Tools */

function sendInteractiveUsage(metric) {
    if (typeof metric === 'number' && metric >= 1 && metric <= 3) {
        fetch(`/api/statistics/metric${metric}`);
    }
}

function preloadAssets() {
    var queue = new createjs.LoadQueue();

    queue.loadManifest([
        { src: './assets/attract/attract-button.png' },
        { src: './assets/attract/title-graphic.png' },
        { src: './assets/building-pyramid/calendar.png' },
        { src: './assets/building-pyramid/choose-location-outer.jpg' },
        { src: './assets/building-pyramid/choose-location-outer.png' },
        { src: './assets/cloud/cloud_00.png' },
        { src: './assets/cloud/cloud_01.png' },
        { src: './assets/cloud/cloud_02.png' },
        { src: './assets/cloud/cloud_03.png' },
        { src: './assets/cloud/cloud_04.png' },
        { src: './assets/cloud/cloud_05.png' },
        { src: './assets/cloud/cloud_06.png' },
        { src: './assets/cloud/cloud_07.png' },
        { src: './assets/cloud/cloud_08.png' },
        { src: './assets/cloud/cloud_09.png' },
        { src: './assets/cloud/cloud_10.png' },
        { src: './assets/cloud/cloud_11.png' },
        { src: './assets/cloud/cloud_12.png' },
        { src: './assets/cloud/cloud_13.png' },
        { src: './assets/cloud/cloud_14.png' },
        { src: './assets/cloud/cloud_15.png' },
        { src: './assets/cloud/cloud_16.png' },
        { src: './assets/cloud/cloud_17.png' },
        { src: './assets/cloud/cloud_18.png' },
        { src: './assets/cloud/cloud_19.png' },
        { src: './assets/cloud/cloud_20.png' },
        { src: './assets/cloud/cloud_21.png' },
        { src: './assets/cloud/cloud_22.png' },
        { src: './assets/cloud/cloud_23.png' },
        { src: './assets/cloud/cloud_24.png' },
        { src: './assets/cloud/cloud_25.png' },
        { src: './assets/cloud/cloud_26.png' },
        { src: './assets/cloud/cloud_27.png' },
        { src: './assets/cloud/cloud_28.png' },
        { src: './assets/cloud/cloud_29.png' },
        { src: './assets/cloud/cloud_30.png' },
        { src: './assets/cloud/cloud_31.png' },
        { src: './assets/cloud/cloud_32.png' },
        { src: './assets/cloud/cloud_33.png' },
        { src: './assets/cloud/cloud_34.png' },
        { src: './assets/cloud/cloud_35.png' },
        { src: './assets/cloud/cloud_36.png' },
        { src: './assets/cloud/cloud_37.png' },
        { src: './assets/cloud/cloud_38.png' },
        { src: './assets/cloud/cloud_39.png' },
        { src: './assets/cloud/cloud_40.png' },
        { src: './assets/cloud/cloud_41.png' },
        { src: './assets/cloud/cloud_42.png' },
        { src: './assets/cloud/cloud_43.png' },
        { src: './assets/cloud/cloud_44.png' },
        { src: './assets/cloud/cloud_45.png' },
        { src: './assets/cloud/cloud_46.png' },
        { src: './assets/cloud/cloud_47.png' },
        { src: './assets/cloud/cloud_48.png' },
        { src: './assets/cloud/cloud_49.png' },
        { src: './assets/cloud/cloud_50.png' },
        { src: './assets/cloud/cloud_51.png' },
        { src: './assets/cloud/cloud_52.png' },
        { src: './assets/cloud/cloud_53.png' },
        { src: './assets/cloud/cloud_54.png' },
        { src: './assets/cloud/cloud_55.png' },
        { src: './assets/cloud/cloud_56.png' },
        { src: './assets/cloud/cloud_57.png' },
        { src: './assets/cloud/cloud_58.png' },
        { src: './assets/cloud/cloud_59.png' },
        { src: './assets/cloud/cloud_60.png' },
        { src: './assets/cloud/cloud_61.png' },
        { src: './assets/cloud/cloud_62.png' },
        { src: './assets/cloud/cloud_63.png' },
        { src: './assets/cloud/cloud_64.png' },
        { src: './assets/cloud/cloud_65.png' },
        { src: './assets/cloud/cloud_66.png' },
        { src: './assets/cloud/cloud_67.png' },
        { src: './assets/cloud/cloud_68.png' },
        { src: './assets/cloud/cloud_69.png' },
        { src: './assets/cloud/cloud_70.png' },
        { src: './assets/cloud/cloud_71.png' },
        { src: './assets/cloud/cloud_72.png' },
        { src: './assets/cloud/cloud_73.png' },
        { src: './assets/cloud/cloud_74.png' },
        { src: './assets/cloud/cloud_75.png' },
        { src: './assets/cloud/cloud_76.png' },
        { src: './assets/cloud/cloud_77.png' },
        { src: './assets/cloud/cloud_78.png' },
        { src: './assets/cloud/cloud_79.png' },
        { src: './assets/cloud/cloud_80.png' },
        { src: './assets/cloud/cloud_81.png' },
        { src: './assets/cloud/cloud_82.png' },
        { src: './assets/cloud/cloud_83.png' },
        { src: './assets/cloud/cloud_84.png' },
        { src: './assets/cloud/cloud_85.png' },
        { src: './assets/cloud/cloud_86.png' },
        { src: './assets/cloud/cloud_87.png' },
        { src: './assets/cloud/cloud_88.png' },
        { src: './assets/cloud/cloud_89.png' },
        { src: './assets/common/background-desert.png' },
        { src: './assets/common/background-higher-ground.png' },
        { src: './assets/common/background-riverbank.jpg' },
        { src: './assets/common/button.png' },
        { src: './assets/common/navigation/materials-active.png' },
        { src: './assets/common/navigation/materials-inactive.png' },
        { src: './assets/common/navigation/scale-active.png' },
        { src: './assets/common/navigation/scale-inactive.png' },
        { src: './assets/common/navigation/site-active.png' },
        { src: './assets/common/navigation/site-inactive.png' },
        { src: './assets/common/navigation/tick.png' },
        { src: './assets/common/navigation/workforce-active.png' },
        { src: './assets/common/navigation/workforce-inactive.png' },
        { src: './assets/common/panel.png' },
        { src: './assets/common/pm-character.png' },
        { src: './assets/common/progress-nar/active-box.png' },
        { src: './assets/common/progress-nar/bar1.png' },
        { src: './assets/common/progress-nar/bar2.png' },
        { src: './assets/common/progress-nar/bar3.png' },
        { src: './assets/common/progress-nar/completed-box.png' },
        { src: './assets/common/progress-nar/inactive-box.png' },
        { src: './assets/common/site-panel.png' },
        { src: './assets/common/timeout.png' },
        { src: './assets/final-pyramid/bent-pyramid-granite.png' },
        { src: './assets/final-pyramid/bent-pyramid-limestone.png' },
        { src: './assets/final-pyramid/bent-pyramid-mud.png' },
        { src: './assets/final-pyramid/finished-pyramid-granite.png' },
        { src: './assets/final-pyramid/finished-pyramid-limestone.png' },
        { src: './assets/final-pyramid/finished-pyramid-mud.png' },
        { src: './assets/final-pyramid/half-pyramid-granite.png' },
        { src: './assets/final-pyramid/half-pyramid-limestone.png' },
        { src: './assets/final-pyramid/half-pyramid-mud.png' },
        { src: './assets/final-pyramid/rubble-pyramid-granite.png' },
        { src: './assets/final-pyramid/rubble-pyramid-limestone.png' },
        { src: './assets/final-pyramid/rubble-pyramid-mud.png' },
        { src: './assets/game/adjust-size/name-label.png' },
        { src: './assets/game/adjust-size/slider-handle.png' },
        { src: './assets/game/adjust-size/slider.png' },
        { src: './assets/game/adjust-size/w1h1.png' },
        { src: './assets/game/adjust-size/w1h2.png' },
        { src: './assets/game/adjust-size/w1h3.png' },
        { src: './assets/game/adjust-size/w2h1.png' },
        { src: './assets/game/adjust-size/w2h2.png' },
        { src: './assets/game/adjust-size/w2h3.png' },
        { src: './assets/game/adjust-size/w3h1.png' },
        { src: './assets/game/adjust-size/w3h2.png' },
        { src: './assets/game/adjust-size/w3h3.png' },
        { src: './assets/game/choose-materials/granite/w1h1.png' },
        { src: './assets/game/choose-materials/granite/w1h2.png' },
        { src: './assets/game/choose-materials/granite/w1h3.png' },
        { src: './assets/game/choose-materials/granite/w2h1.png' },
        { src: './assets/game/choose-materials/granite/w2h2.png' },
        { src: './assets/game/choose-materials/granite/w2h3.png' },
        { src: './assets/game/choose-materials/granite/w3h1.png' },
        { src: './assets/game/choose-materials/granite/w3h2.png' },
        { src: './assets/game/choose-materials/granite/w3h3.png' },
        { src: './assets/game/choose-materials/granite.png' },
        { src: './assets/game/choose-materials/limestone/w1h1.png' },
        { src: './assets/game/choose-materials/limestone/w1h2.png' },
        { src: './assets/game/choose-materials/limestone/w1h3.png' },
        { src: './assets/game/choose-materials/limestone/w2h1.png' },
        { src: './assets/game/choose-materials/limestone/w2h2.png' },
        { src: './assets/game/choose-materials/limestone/w2h3.png' },
        { src: './assets/game/choose-materials/limestone/w3h1.png' },
        { src: './assets/game/choose-materials/limestone/w3h2.png' },
        { src: './assets/game/choose-materials/limestone/w3h3.png' },
        { src: './assets/game/choose-materials/limestone.png' },
        { src: './assets/game/choose-materials/material-label-selected.png' },
        { src: './assets/game/choose-materials/material-label.png' },
        { src: './assets/game/choose-materials/mudbricks/w1h1.png' },
        { src: './assets/game/choose-materials/mudbricks/w1h2.png' },
        { src: './assets/game/choose-materials/mudbricks/w1h3.png' },
        { src: './assets/game/choose-materials/mudbricks/w2h1.png' },
        { src: './assets/game/choose-materials/mudbricks/w2h2.png' },
        { src: './assets/game/choose-materials/mudbricks/w2h3.png' },
        { src: './assets/game/choose-materials/mudbricks/w3h1.png' },
        { src: './assets/game/choose-materials/mudbricks/w3h2.png' },
        { src: './assets/game/choose-materials/mudbricks/w3h3.png' },
        { src: './assets/game/choose-materials/mudbricks.png' },
        { src: './assets/game/choose-materials/polished-limestone.png' },
        { src: './assets/game/choose-materials/selected-material.png' },
        { src: './assets/game/select-site/back-icon.png' },
        { src: './assets/game/select-site/desert-active.png' },
        { src: './assets/game/select-site/desert-line-active.png' },
        { src: './assets/game/select-site/desert-line.png' },
        { src: './assets/game/select-site/desert.png' },
        { src: './assets/game/select-site/higher-ground-active.png' },
        { src: './assets/game/select-site/higher-ground-line-active.png' },
        { src: './assets/game/select-site/higher-ground-line.png' },
        { src: './assets/game/select-site/higher-ground.png' },
        { src: './assets/game/select-site/map-desert.png' },
        { src: './assets/game/select-site/map-higher-ground.png' },
        { src: './assets/game/select-site/map-riverbank.png' },
        { src: './assets/game/select-site/map.png' },
        { src: './assets/game/select-site/riverbank-active.png' },
        { src: './assets/game/select-site/riverbank-line-active.png' },
        { src: './assets/game/select-site/riverbank-line.png' },
        { src: './assets/game/select-site/riverbank.png' },
        { src: './assets/game/select-site/selection-glow.png' },
        { src: './assets/game/select-workforce/build-pyramid-button.png' },
        { src: './assets/game/select-workforce/granite/w1h1.png' },
        { src: './assets/game/select-workforce/granite/w1h2.png' },
        { src: './assets/game/select-workforce/granite/w1h3.png' },
        { src: './assets/game/select-workforce/granite/w2h1.png' },
        { src: './assets/game/select-workforce/granite/w2h2.png' },
        { src: './assets/game/select-workforce/granite/w2h3.png' },
        { src: './assets/game/select-workforce/granite/w3h1.png' },
        { src: './assets/game/select-workforce/granite/w3h2.png' },
        { src: './assets/game/select-workforce/granite/w3h3.png' },
        { src: './assets/game/select-workforce/large-workforce-selected.png' },
        { src: './assets/game/select-workforce/large-workforce.png' },
        { src: './assets/game/select-workforce/limestone/w1h1.png' },
        { src: './assets/game/select-workforce/limestone/w1h2.png' },
        { src: './assets/game/select-workforce/limestone/w1h3.png' },
        { src: './assets/game/select-workforce/limestone/w2h1.png' },
        { src: './assets/game/select-workforce/limestone/w2h2.png' },
        { src: './assets/game/select-workforce/limestone/w2h3.png' },
        { src: './assets/game/select-workforce/limestone/w3h1.png' },
        { src: './assets/game/select-workforce/limestone/w3h2.png' },
        { src: './assets/game/select-workforce/limestone/w3h3.png' },
        { src: './assets/game/select-workforce/medium-workforce-selected.png' },
        { src: './assets/game/select-workforce/medium-workforce.png' },
        { src: './assets/game/select-workforce/mudbricks/w1h1.png' },
        { src: './assets/game/select-workforce/mudbricks/w1h2.png' },
        { src: './assets/game/select-workforce/mudbricks/w1h3.png' },
        { src: './assets/game/select-workforce/mudbricks/w2h1.png' },
        { src: './assets/game/select-workforce/mudbricks/w2h2.png' },
        { src: './assets/game/select-workforce/mudbricks/w2h3.png' },
        { src: './assets/game/select-workforce/mudbricks/w3h1.png' },
        { src: './assets/game/select-workforce/mudbricks/w3h2.png' },
        { src: './assets/game/select-workforce/mudbricks/w3h3.png' },
        { src: './assets/game/select-workforce/small-workforce-selected.png' },
        { src: './assets/game/select-workforce/small-workforce.png' },
        { src: './assets/game/select-workforce/workers-large.png' },
        { src: './assets/game/select-workforce/workers-medium.png' },
        { src: './assets/game/select-workforce/workers-small.png' },
        { src: './assets/introduction/intro-panel.png' },
        { src: './assets/introduction/pm-larger.png' },
        { src: './assets/introduction/start-button.png' },
        { src: './assets/introduction/welcome-title-graphic.png' },
        { src: './assets/scenario/icon-pray.png' },
        { src: './assets/scenario/icon-time.png' },
        { src: './assets/scenario/icon-work-on.png' },
        { src: './assets/scenario/popup-window.png' },
        { src: './assets/scenario/pyramid-granite.png' },
        { src: './assets/scenario/pyramid-limestone.png' },
        { src: './assets/scenario/pyramid-mudbricks.png' },
        { src: './assets/scenario/scenario-option.png' },
        { src: './assets/scenario/scene-desert.png' },
        { src: './assets/scenario/scene-higher-ground.png' },
        { src: './assets/scenario/scene-riverbank.png' },
        { src: './assets/score/background.jpg' },
        { src: './assets/score/score-desert.png' },
        { src: './assets/score/score-higher-ground.png' },
        { src: './assets/score/score-label.png' },
        { src: './assets/score/score-riverbank.png' },
        { src: './assets/score/scorecard.png' }
    ]);
}